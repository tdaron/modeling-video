import {all, chain, createRef, Direction, easeInBack, easeInOutElastic, makeProject, map, slideTransition, tween, Vector2} from '@revideo/core';

import {Img, makeScene2D, Rect, Txt, Video, Audio} from '@revideo/2d';
import {waitFor} from '@revideo/core';
/**
 * The Revideo scene
 */

const apocalypseScene = makeScene2D("scene", function* (view) {
  view.add(
    <Rect
      width={'100%'}
      height={'100%'}
      fill={'#34495e'} // couleur de fond
    />
  );

  yield* waitFor(1);
  const audioRef = createRef<Audio>();
  const audio = <Audio
      src={'/intro.mp3'}
      ref={audioRef}
      play={true}
    />
  view.add(audio)
  yield* waitFor(1.2);

  const text =
    <Txt text="2035" opacity={1} fill={"white"} fontSize={500}/>
  view.add(text);

  yield* waitFor(3.65);
  const videoRef = createRef<Video>();
  const video =
  <Video src={'/apocalypse.mp4'} ref={videoRef} size={['100%', '100%']} play={true} playbackRate={1} volume={0} />
  view.add(video);
  text.remove()
  yield* waitFor(3.65);
  video.remove();
  const video2 =
  <Video src={'/paris.mp4'} ref={videoRef} size={['100%', '100%']} play={true} playbackRate={1} volume={0} />
  view.add(video2);
  yield* waitFor(3.65);
  video2.remove()
  const video3 = 
  <Video src={'/end.mp4'} ref={videoRef} size={['100%', '100%']} play={true} playbackRate={1} volume={0} />
  view.add(video3);
  yield* waitFor(6);

  yield* tween(1, value => {
    audioRef().setVolume(map(1, 0, value))
  });

  
})
 
const scene = makeScene2D('scene', function* (view) {
  view.add(
    <Rect
      width={'100%'}
      height={'100%'}
      fill={'#16a085'} // couleur de fond
    />
  );
  yield* slideTransition(Direction.Left);

  const text =
    <Txt text="Hello, World" opacity={0}/>
  view.add(text);


  yield* tween(1, value => {
    text.opacity(map(0, 1, value));
  });

  const video =
  <Video src={'/intro.mp4'} size={['75%', '75%']} scaleX={0} scaleY={0} play={true} playbackRate={1} volume={1} />

  const ocean =
  <Img src={'/ocean.jpg'} width={300} position={{x: 0, y:0}}/>

  view.add(video)  
  view.add(ocean)

  
  
  yield* all(
    video.scale.x(1, 1), // Goes to 1 in 1 second
    video.scale.y(1, 1),
    chain(
      ocean.position(new Vector2(-100, 0), 1),
      ocean.position(new Vector2(-200, -500), 1),
    )
  );
  yield* waitFor(20)

  
});

/**
 * The final revideo project
 */
export default makeProject({
  scenes: [apocalypseScene, scene],
  settings: {
    // Example settings:
    shared: {
      size: {x: 1920, y: 1080},
    },
  },
});
