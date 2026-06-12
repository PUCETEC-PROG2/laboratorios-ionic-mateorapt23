import { IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { pencil, trash } from 'ionicons/icons';
import { repositoryList } from '../Interfaces/Repository';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
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
            <RepoItem {...repo} />
          )
          )}
        </IonList>

        <IonList>
          <IonItemSliding>
            <IonItem>
            <IonThumbnail>
              <img src='https://avatars.githubusercontent.com/u/216232529?v=4' alt='Repositorio 1'></img>
            </IonThumbnail>
            <IonLabel>
              <h3>Repositorio 1</h3>
              <p>Descripción del repositorio 1</p>
              <p><strong>Lenguaje:</strong> Kotlin</p>
            </IonLabel>
            </IonItem>

            <IonItemOptions>
              <IonItemOption>
                <IonIcon icon={pencil} slot="icon-only"/>               
              </IonItemOption>
              <IonItemOption color="danger">
                <IonIcon icon={trash} slot="icon-only"/>               
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

        </IonList>
 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;