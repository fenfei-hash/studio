export type Choice = {
  text: string;
  nextNode: string; // Can be another nodeId or 'game-over'
  isCorrect: boolean;
  consequence?: string; // For wrong choices
};

export type GameNode = {
  id: string;
  type: 'intro' | 'decision';
  text: string;
  image: {
    id: string; // from placeholder-images.json
  };
  nextNode?: string; // For intro pages
  choices?: Choice[];
  scenarioForAI?: string; // For AI description generation
};

export type GameData = {
  [key: string]: GameNode;
};

export const gameData: GameData = {
  'intro-1': {
    id: 'intro-1',
    type: 'intro',
    text: 'The rusted gates of St. Jude’s Memorial Hospital groaned as you and your friends pushed them open. A dare, fueled by teenage bravado, brought you here. The moon hid behind a thick blanket of clouds, casting long, dancing shadows that played tricks on your eyes. The air was heavy, still, and smelled of decay and forgotten memories. This was a bad idea.',
    image: { id: 'hospital-exterior' },
    nextNode: 'intro-2',
  },
  'intro-2': {
    id: 'intro-2',
    type: 'intro',
    text: 'Inside, the rot was palpable. Wallpaper peeled like sunburnt skin, and a thick layer of dust coated everything. You lagged behind, drawn to a patient file left open on a gurney. "Subject exhibits extreme paranoia..." it began. You looked up, calling out to your friends, but the hallway was empty. The silence that answered was absolute and predatory.',
    image: { id: 'hospital-interior' },
    nextNode: 'intro-3',
  },
  'intro-3': {
    id: 'intro-3',
    type: 'intro',
    text: 'A loud buzz, then the lights flickered violently. Darkness. A moment later, they sputtered back to a sickly, dim life. A shape stood at the other end of the hall. No, not a shape. A figure. As it glided closer, you saw it was a nurse. Her eyes were covered in stained bandages, and in her hand, she held a rusted, wicked-looking syringe. She was right behind you.',
    image: { id: 'eyeless-nurse' },
    nextNode: 'node-1',
  },
  'node-1': {
    id: 'node-1',
    type: 'decision',
    text: 'Panic claws at your throat. The Eyeless Nurse is inches away, her head cocked as if listening to your racing heart. The syringe in her hand drips a dark, viscous fluid. There is no time to think, only to react. What do you do?',
    image: { id: 'nurse-close-up' },
    scenarioForAI: 'The player has just encountered the Eyeless Nurse for the first time and is in a state of panic.',
    choices: [
      { text: 'Scream for help', nextNode: 'game-over', isCorrect: false, consequence: 'Your scream is a dinner bell. The Nurse lunges, and the world goes silent.' },
      { text: 'Throw the patient file at her', nextNode: 'node-2', isCorrect: true },
      { text: 'Freeze in place', nextNode: 'game-over', isCorrect: false, consequence: 'Hesitation is fatal. The syringe plunges into your neck before you can even flinch.' },
    ],
  },
  'node-2': {
    id: 'node-2',
    type: 'decision',
    text: 'The file hits her with a pathetic thud, but it buys you a precious second. You scramble away, your feet slipping on the grimy floor. You are at a cross-section in the hallway. To your left, a crumbling staircase leads up into darkness. To your right, the doors to an ancient service elevator hang ajar. Straight ahead is a patient room, door slightly open.',
    image: { id: 'hospital-hallway' },
    scenarioForAI: 'The player has momentarily stunned the nurse and is now at a crossroads in a derelict hospital hallway, deciding on an escape route.',
    choices: [
      { text: 'Take the stairs', nextNode: 'game-over', isCorrect: false, consequence: 'The stairs are rotten. A step gives way, and you tumble into the darkness below. You are not alone down there.' },
      { text: 'Hide in the patient room', nextNode: 'node-3', isCorrect: true },
      { text: 'Try the elevator', nextNode: 'game-over', isCorrect: false, consequence: 'You squeeze into the elevator car, frantically pressing the close button. The doors don\'t move. The Nurse\'s bandaged face appears in the gap.' },
    ],
  },
  'node-3': {
    id: 'node-3',
    type: 'decision',
    text: 'You slip into the patient room, pulling the door quietly shut. The room is a wreck, an overturned bed and a shattered window being the only features. You hear the slow, deliberate shuffling of the Nurse outside. You need to hide, now! Your options are limited.',
    image: { id: 'patient-room' },
    scenarioForAI: 'The player is hiding in a wrecked patient room while the nurse searches for them outside.',
    choices: [
      { text: 'Hide under the bed', nextNode: 'game-over', isCorrect: false, consequence: 'The oldest trick in the book. A moment later, the bed is violently overturned, and she is upon you.' },
      { text: 'Climb into the ceiling panel', nextNode: 'game-over', isCorrect: false, consequence: 'You pull yourself up, but the panel is loose. It crashes down, and so do you, right at her feet.' },
      { text: 'Press yourself into the dark corner behind the door', nextNode: 'node-4', isCorrect: true },
    ],
  },
  'node-4': {
    id: 'node-4',
    type: 'decision',
    text: 'You hold your breath as the door creaks open. The Nurse stands in the doorway, her head slowly scanning the room. She seems to look right through you. After an eternity, she shuffles on. You can see the red glow of an "EXIT" sign at the far end of the hall. This is your chance.',
    image: { id: 'nurse-leaving-room' },
    scenarioForAI: 'The nurse has passed the player\'s hiding spot. The exit is visible down the hall. This is the final escape.',
    choices: [
      { text: 'Sprint for the exit', nextNode: 'success', isCorrect: true },
      { text: 'Wait a little longer', nextNode: 'game-over', isCorrect: false, consequence: 'You waited too long. The shuffling stops, then rapidly approaches from behind. You never saw it coming.' },
      { text: 'Look for a weapon', nextNode: 'game-over', isCorrect: false, consequence: 'Your search for a weapon makes too much noise. She\'s back in an instant, and there is nowhere left to run.' },
    ],
  },
};

export const gameOverContent = {
  text: "You have been caught. The last thing you see are the bandaged voids where her eyes should be.",
  moviePoster: {
    title: "The Nurse's Watch",
    tagline: "Coming Soon",
    image: { id: 'movie-poster' },
  }
};

export const successContent = {
  text: 'You burst through the heavy doors, gasping the cool night air. You don\'t look back. You just run. You are free. But you know you will never forget the horrors of St. Jude\'s, or the Eyeless Nurse who still walks its wards.',
  image: { id: 'escape' },
};
