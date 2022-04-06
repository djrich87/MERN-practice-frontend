import styles from './FishList.module.css'
import FishCard from '../../components/FishCard/FishCard';

const fishIds = [1025,1012,1062,1084,169,200,219,237,244,275,40,433,577,582,593,611,659,718,783,790,824,837,881,937,943]

const FishList = (props) => {
  console.log(props)
  return (
    <>
      <h1>Fish List</h1>
      <div className={styles.container}>
        {props.fishes.map(fish => (
          <FishCard 
          key={fish._id} 
          fish={fish} 
          randFishImgId={fishIds[Math.floor(Math.random()*(fishIds.length))]}
          handleDeleteFish={props.handleDeleteFish}
          user={props.user}
          />
        ))}
      </div>
    </>
  )
}

export default FishList;