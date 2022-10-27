import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import Next from "../Icons/Next";
import Pause from "../Icons/Pause";
import Play from "../Icons/Play";
import Previous from "../Icons/Previous";
import Repeat from "../Icons/Repeat";
import Shuffle from "../Icons/Shuffle";
import CurrentTrack from "./CurrentTrack";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 96px;
  padding-left: 26px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  width: 200px;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ControlBarProps = {
  nowPlaying?: {
    album: string;
    artist: string;
    title: string;
    cover: string;
    duration: number;
    progress: number;
    isPlaying?: boolean;
    albumId: string;
  };
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
};

const ControlBar: FC<ControlBarProps> = ({
  nowPlaying,
  onNext,
  onPrevious,
  onPlay,
  onPause,
  onShuffle,
  onRepeat,
}) => {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (nowPlaying) {
      setPlayed(nowPlaying.isPlaying!);
    }
  }, [nowPlaying]);

  const handlePlay = () => {
    setPlayed(true);
    onPlay();
  };

  const handlePause = () => {
    setPlayed(false);
    onPause();
  };

  return (
    <Container>
      <Controls>
        <Button onClick={onShuffle}>
          <Shuffle />
        </Button>
        <Button onClick={onPrevious}>
          <Previous />
        </Button>
        {!played && (
          <Button onClick={handlePlay}>
            <Play />
          </Button>
        )}
        {played && (
          <Button onClick={handlePause}>
            <Pause />
          </Button>
        )}
        <Button onClick={onNext}>
          <Next />
        </Button>
        <Button onClick={onRepeat}>
          <Repeat />
        </Button>
      </Controls>
      <CurrentTrack nowPlaying={nowPlaying} />
    </Container>
  );
};

export default ControlBar;
