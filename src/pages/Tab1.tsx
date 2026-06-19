import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import { fetchRepositories } from '../services/GithubService';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { Repository } from '../interfaces/Repository';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadRepos = async () => {
    setLoading(true);
    const repos = await fetchRepositories();
    setRepositoryList(repos);
    setLoading(false);
  }

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar slot='bottom'>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repositoryList.map((repo)=> (
            <RepoItem {...repo} key={repo.id}/>
          )
          )}
        </IonList>
        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;