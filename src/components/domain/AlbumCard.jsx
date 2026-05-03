import { useState } from 'react';
import { useAlbumPhotos } from '../../hooks/useAlbums';
import Modal from '../ui/Modal';
import Loader from '../ui/Loader';
import { Images } from 'lucide-react';
import styles from './AlbumCard.module.css';

export default function AlbumCard({ album }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: photos, isLoading } = useAlbumPhotos(album.id);

  // Take first 4 photos for the cover grid
  const previewPhotos = photos?.slice(0, 4) || [];

  return (
    <>
      <div className={`glass-panel ${styles.card}`} onClick={() => setIsModalOpen(true)}>
        <div className={styles.coverGrid}>
          {isLoading ? (
            <div className={styles.coverLoader}><Loader /></div>
          ) : previewPhotos.length > 0 ? (
            previewPhotos.map((photo) => (
              <div key={photo.id} className={styles.coverImgWrapper}>
                <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
              </div>
            ))
          ) : (
            <div className={styles.emptyCover}>
              <Images size={32} />
            </div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{album.title}</h3>
          <p className={styles.count}>{photos ? photos.length : 0} photos</p>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={album.title}
      >
        {isLoading ? <Loader fullPage /> : (
          <div className={styles.photoGrid}>
            {photos?.map(photo => (
              <div key={photo.id} className={styles.photoItem}>
                <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
                <div className={styles.photoOverlay}>
                  <p className={styles.photoTitle}>{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
