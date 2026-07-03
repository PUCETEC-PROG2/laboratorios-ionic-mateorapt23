import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { Repository } from '../interfaces/Repository';
import { createRepository, updateRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

interface Tab2LocationState {
  repo?: Repository;
}

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<Tab2LocationState>();
  const editingRepo = location.state?.repo;
  const isEditing = !!editingRepo;

  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: editingRepo?.name ?? "",
    description: editingRepo?.description ?? ""
  });
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);

  const saveRepo = () =>{
    if (repositoryData.name.trim() === '') {
      setErrorMsg("El nombre del repositorio es obligatorio");
      return; 
    }
    setLoading(true)

    const request = isEditing && editingRepo
      ? updateRepository(editingRepo.owner.login, editingRepo.name, repositoryData)
      : createRepository(repositoryData);

    request
    .then(() => {
      setRepositoryData({
        name: "",
        description: ""
      })
      history.push("/tab1")
    }).catch((error) => setErrorMsg(`Error al ${isEditing ? 'actualizar' : 'crear'} repositorio ` + error))
    .finally(() => setLoading(false));
  }

  const cancelEdit = () => {
    setRepositoryData({
      name: "",
      description: ""
    });
    history.push("/tab1");
  }

  useIonViewWillEnter ( () => {
    setErrorMsg("");
    setRepositoryData({
      name: editingRepo?.name ?? "",
      description: editingRepo?.description ?? ""
    });
  }, [editingRepo]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Editar repositorio' : 'Formulario de repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? 'Editar repositorio' : 'Formulario de repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='form-container'>
          <IonInput
            className="form-field"
            label='Nombre del repositorio'
            labelPlacement='floating'
            value={repositoryData.name}
            onIonInput={(e) => setRepositoryData({...repositoryData, name: e.detail.value!})}
            placeholder='Ingrese el nombre del repositorio'
          />
          <IonTextarea
            className='form-field'
            label='Descripción del repositorio'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            value={repositoryData.description}
            onIonInput={(e) => setRepositoryData({...repositoryData, description: e.detail.value!})}
            rows={6}
          />
          {errorMsg != "" && <IonText color="danger">{errorMsg}</IonText>}

          {isEditing ? (
            <>
              <IonButton
                className='form-field'
                expand='block'
                color='medium'
                onClick={cancelEdit}
              >
                Cancelar
              </IonButton>
              <IonButton
                className='form-field'
                expand='block'
                color='primary'
                onClick={saveRepo}
              >
                Aplicar
              </IonButton>
            </>
          ) : (
            <IonButton
              className='form-field'
              expand='block'
              color='primary'
              onClick={saveRepo}
            >
              Guardar
            </IonButton>
          )}
        </div>
        {loading && <LoadingSpinner />}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;