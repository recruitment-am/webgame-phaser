import { useLoading } from './SceneContext';
import './StartButton.css';

export default function StartButton(): JSX.Element {
  const { setGame } = useLoading();

  function handleClick() {
    setGame(true);
  }

  return (
    <div className="relativeWrapper">
      <div className="container">
        <button className="startButton" onClick={handleClick}>
          START GRY
        </button>
      </div>
    </div>
  );
}
