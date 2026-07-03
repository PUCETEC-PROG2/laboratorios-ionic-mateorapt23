import { IonAlert, IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import { deleteRepository, fetchRepositories } from '../services/GithubService';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { useHistory } from 'react-router';
import { Repository } from '../interfaces/Repository';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [repoToDelete, setRepoToDelete] = React.useState<Repository | null>(null);
  const [showDeletedToast, setShowDeletedToast] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true);
    fetchRepositories().then((reposData) => {
      setRepositoryList(reposData);
    }).catch((error) => {
      console.log("Error al cargar repositorios", error);
      setErrorMsg("Error al cargar repositorios: " + error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  const handleEdit = (repo: Repository) => {
    history.push('/tab2', { repo });
  };

  const handleDeleteRequest = (repo: Repository) => {
    setRepoToDelete(repo);
  };

  const confirmDelete = () => {
    if (!repoToDelete) return;
    const repo = repoToDelete;
    setLoading(true);
    deleteRepository(repo.owner.login, repo.name)
      .then(() => {
        setRepositoryList((prev) => prev.filter((r) => r.id !== repo.id));
        setShowDeletedToast(true);
      })
      .catch((error) => {
        setErrorMsg("Error al eliminar repositorio: " + error);
      })
      .finally(() => {
        setLoading(false);
        setRepoToDelete(null);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar slot='bottom'>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repositoryList.map((repo)=> (
            <RepoItem
              repository={repo}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              key={repo.id}
            />
          )
          )}
        </IonList>
        {loading && <LoadingSpinner />}
        {errorMsg !== "" && (
          (<IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>)
        )}
      </IonContent>

      <IonAlert
        isOpen={repoToDelete !== null}
        onDidDismiss={() => setRepoToDelete(null)}
        header="Eliminar repositorio"
        message={`¿Seguro que deseas eliminar "${repoToDelete?.name}"? Esta acción no se puede deshacer.`}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: confirmDelete
          }
        ]}
      />

      <IonToast
        isOpen={showDeletedToast}
        onDidDismiss={() => setShowDeletedToast(false)}
        message="Repositorio eliminado exitosamente"
        duration={2000}
      />
    </IonPage>
  );
};

export default Tab1;