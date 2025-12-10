import {all, chain, createRef, easeInBack, easeInOutElastic, makeProject, map, tween, Vector2} from '@revideo/core';

import {Img, makeScene2D, Rect, Txt, Video} from '@revideo/2d';
import {waitFor} from '@revideo/core';

/**
 * The Revideo scene
 */
const scene = makeScene2D('scene', function* (view) {
  view.add(
    <Rect
      width={'100%'}
      height={'100%'}
      fill={'#16a085'} // couleur de fond
    />
  );
  const text =
    <Txt text="Hello, World" opacity={0}/>
  view.add(text);


  yield* tween(1, value => {
    text.opacity(map(0, 1, value));
  });

  const video =
  <Video src={'/intro.mp4'} size={['75%', '75%']} scaleX={0} scaleY={0} play={true} />

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
  yield* waitFor(15)

  
});

/**
 * The final revideo project
 */
export default makeProject({
  scenes: [scene],
  settings: {
    // Example settings:
    shared: {
      size: {x: 1920, y: 1080},
    },
  },
});
