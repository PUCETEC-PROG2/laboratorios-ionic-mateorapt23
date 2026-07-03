import React, { useRef } from "react";
import { Repository } from "../interfaces/Repository";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { pencil, trash } from "ionicons/icons";

interface RepoItemProps {
    repository: Repository;
    onEdit: (repository: Repository) => void;
    onDelete: (repository: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onEdit, onDelete }) => {
    const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

    const handleEdit = () => {
        slidingRef.current?.close();
        onEdit(repository);
    };

    const handleDelete = () => {
        slidingRef.current?.close();
        onDelete(repository);
    };

    return(
      <IonItemSliding ref={slidingRef}>
        <IonItem>
          <IonThumbnail slot="start">
            <img
              src={repository.owner.avatar_url}
              alt={repository.name}
            />
          </IonThumbnail>
        
          <IonLabel>
            <h3>{repository.name}</h3>
            { repository.description && (
            <p>{repository.description}</p>
            )}
            { repository.language && (
            <p>
              <strong>Lenguaje:</strong> {repository.language}
            </p>
            )}
          </IonLabel>
          </IonItem>
        
            <IonItemOptions>
              <IonItemOption onClick={handleEdit}>
                <IonIcon icon={pencil} slot="icon-only" />
              </IonItemOption>
        
              <IonItemOption color="danger" onClick={handleDelete}>
                <IonIcon icon={trash} slot="icon-only" />
              </IonItemOption>
            </IonItemOptions>
      </IonItemSliding>
    );
}
 export default RepoItem