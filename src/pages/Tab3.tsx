import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/216232529?v=4"
            alt="Avatar" 
            />
            <IonHeader>
              <IonCardTitle>Mateo Rodríguez</IonCardTitle>
              <IonCardSubtitle>mateorodriguez</IonCardSubtitle>
              <IonCardContent>
                <p>Desarrollador de software con experiencia en aplicaciones web</p>
              </IonCardContent>
            </IonHeader>
          </IonCard>
        </div>  
  
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
