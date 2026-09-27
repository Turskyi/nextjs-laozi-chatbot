export interface ManuscriptPageData {
  pageNumber: number;
  title: string;
  shortTitle: string;
  imageSrc: string;
  caption: string;
  content: string;
  isLastPage?: boolean;
  pieces?: ManuscriptPiece[];
}

export interface ManuscriptPiece {
  imageSrc: string;
  caption: string;
}

const P2255_CAPTION =
  "Pelliot chinois 2255, Bibliothèque nationale de France (via the International Dunhuang Project)";

export const MANUSCRIPT_PAGES: ManuscriptPageData[] = [
  {
    pageNumber: 1,
    title: "Title Leaf",
    shortTitle: "Title Leaf",
    imageSrc: "/manuscripts/pelliot-2584/page-1.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content:
      "Laozi's Daodejing - Upper Part. Title leaf of a handwritten Dunhuang copy (Pelliot chinois 2584, Bibliothèque nationale de France). The small inscription names a former owner, the Daoist priest Su Dongxuan; the red seal is the library's stamp.",
  },
  {
    pageNumber: 2,
    title: "Preface — part 1",
    shortTitle: "Preface 1",
    imageSrc: "/manuscripts/pelliot-2584/page-2.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content:
      "Preface — part 1. The opening of Ge Xuan's preface: the Daodejing as the source of the teaching of the Dao, and the story of Heshang Gong — the nameless master who lived by the Yellow River expounding Laozi's book — whom Emperor Wen of Han sought out in person. Continues on the next page.",
  },
  {
    pageNumber: 3,
    title: "Preface — part 2",
    shortTitle: "Preface 2",
    imageSrc: "/manuscripts/pelliot-2584/page-3.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content:
      "Preface — part 2. Continued from the previous page: Emperor Wen's confession and Ge Xuan's account of Laozi's descent and the transmission of the scripture. This is front matter: the Daodejing itself begins on the next page.",
  },
  {
    pageNumber: 4,
    title: "Chapter 1",
    shortTitle: "Chapter 1",
    imageSrc: "/manuscripts/pelliot-2584/page-4.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content: `Chapter 1

The Dao that can be spoken is not the constant Dao;
the name that can be named is not the constant name.
The nameless is the beginning of heaven and earth…`,
  },
  {
    pageNumber: 5,
    title: "Chapters 1–8",
    shortTitle: "Ch. 1–8",
    imageSrc: "/manuscripts/pelliot-2584/page-5.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content: `The named is the mother of all things.
Therefore, always without desire, one observes its mystery;
always with desire, one observes its manifestations.
These two emerge together but differ in name;
together they are called the deep and dark.
Deep and dark, and deeper still,
the doorway to all mysteries.

Chapter 2

When everyone under heaven knows beauty as beauty, ugliness arises.
When everyone knows good as good, evil arises.
Thus, presence and absence generate each other;
difficult and easy complete each other;
long and short define each other;
high and low incline toward each other;
sound and tone harmonize with each other;
before and after follow each other.

Therefore the sage dwells in the action of non-action,
and practices the teaching without words.
All things arise, and he does not turn away from them;
he produces without possessing,
acts without relying on it,
accomplishes without dwelling on it.
Because he does not dwell on it, it does not depart.

Chapter 3

Not exalting the worthy prevents the people from competing.
Not valuing rare goods prevents the people from stealing.
Not displaying the desirable keeps the people's hearts unconfused.

Therefore the governance of the sage
empties their hearts and fills their bellies,
weakens their ambitions and strengthens their bones.
He constantly causes the people to be without knowledge and without desire,
so that the clever dare not act.
Act through non-action, and nothing will be unruled.

Chapter 4

The Dao is empty, yet used it is never exhausted.
Fathomless, like the ancestor of all things.
Blunt its sharpness,
untangle its knots,
soften its glare,
merge with its dust.
Deep and quiet, it seems to persist.
I do not know whose child it is;
it appears to precede the Supreme Ancestor.

Chapter 5

Heaven and Earth are not humane;
they treat the ten thousand things as straw dogs.
The sage is not humane;
he treats the common people as straw dogs.

The space between Heaven and Earth, how like a bellows it is!
Empty yet not collapsed,
moved, it produces even more.
Many words are soon exhausted;
it is better to hold to the center.

Chapter 6

The valley spirit never dies;
it is called the mysterious female.
The gateway of the mysterious female
is called the root of Heaven and Earth.
Continuous, as if it exists,
use it without strain.

Chapter 7

Heaven is long-lasting and Earth is enduring.
The reason Heaven and Earth can endure so long
is that they do not live for themselves;
therefore they can live long.

Therefore the sage puts himself last, yet comes first;
treats himself as outside, yet is preserved.
Is it not because he is without self-interest?
Thus he is able to fulfill his self-interest.

Chapter 8

Highest goodness is like water.
Water excels in benefiting all things without striving,
dwelling in places that people disdain.
Therefore it is close to the Dao.

For dwelling, good is the ground;
for the heart, good is depth;
for giving, good is humaneness;
for words, good is trustworthiness…`,
  },
  {
    pageNumber: 6,
    title: "Chapters 8–14",
    shortTitle: "Ch. 8–14",
    imageSrc: "/manuscripts/pelliot-2584/page-6.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    content: `…for governing, good is order;
for affairs, good is capability;
for action, good is timeliness.
Because it does not strive, it is free from fault.

Chapter 9

To fill to overflowing is not as good as stopping in time.
Sharpen a blade to its keenest, and it cannot be long preserved.
Fill a hall with gold and jade, and no one can protect it.
To be proud of wealth and status invites one's own ruin.
When the work is done and fame achieved, withdraw—
this is the Dao of Heaven.

Chapter 10

Carrying your soul and embracing the One,
can you remain undivided?
Concentrating your qi and attaining softness,
can you be like a newborn infant?
Cleansing your inner vision,
can you leave it without flaw?
Loving the people and ruling the state,
can you do so without action?
Opening and closing the gates of Heaven,
can you play the female role?
Understanding all things clearly,
can you remain without cleverness?

Give birth to them, nourish them;
produce without possessing,
act without relying on it,
lead without dominating:
this is called mysterious virtue.

Chapter 11

Thirty spokes share one hub;
it is in its emptiness that the usefulness of the cart lies.
Knead clay to make a vessel;
it is in its emptiness that the usefulness of the vessel lies.
Cut out doors and windows to make a room;
it is in its emptiness that the usefulness of the room lies.
Therefore, what has being brings advantage;
what has non-being brings usefulness.

Chapter 12

The five colors blind the eye.
The five notes deafen the ear.
The five flavors dull the palate.
Racing and hunting madden the heart.
Rare goods hinder one's conduct.

Therefore the sage acts for the belly, not for the eye.
He chooses the one and discards the other.

Chapter 13

Favor and disgrace cause alarm;
value great trouble as you value the body.

What does "favor and disgrace cause alarm" mean?
Favor is lower;
gaining it brings alarm, losing it brings alarm.
This is what is meant by "favor and disgrace cause alarm."

What does "value great trouble as you value the body" mean?
The reason I have great trouble is that I have a body.
When I no longer have a body, what trouble could I have?

Therefore, one who values the world as his own body can be entrusted with the world.
One who loves the world as his own body can be given custody of the world.

Chapter 14

Look at it, but it cannot be seen: it is called the invisible.
Listen to it, but it cannot be heard: it is called the inaudible.
Grasp at it, but it cannot be held: it is called the formless.
These three cannot be fully scrutinized,
so they merge into one.

Its top is not bright,
its bottom is not dark.
Endless and unnameable,
it returns to non-thingness.
This is called the form of the formless,
the image of the imageless;
this is called vague and elusive.

Meet it, and you do not see its head;
follow it, and you do not see its back.
Hold to the ancient Dao to master present existence.
To know the ancient beginning is called the thread of the Dao.`,
  },
  {
    pageNumber: 7,
    title: "Chapters 15–21",
    shortTitle: "Ch. 15–21",
    imageSrc: "/manuscripts/pelliot-2584/page-7.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    pieces: [
      { imageSrc: "/manuscripts/pelliot-2584/page-7.jpg", caption: "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)" },
      { imageSrc: "/manuscripts/pelliot-2255/page-7.jpg", caption: P2255_CAPTION },
    ],
    content: `Chapter 15

The ancient masters who excelled in the Dao
were subtle, mysterious, profound, and penetrating,
too deep to be comprehended.
Because they cannot be comprehended,
one can only describe them appearance-wise:
Hesitant, like crossing a frozen stream in winter;
cautious, like fearing neighbors on all sides;
reserved, like a guest;
yielding, like ice about to melt;
simple, like uncarved wood;
broad, like a valley;
turbid, like muddy water.

Who can settle muddy water? By keeping still, it gradually clears.
Who can remain still long? By moving slowly, it gradually comes alive.
Those who preserve this Dao do not desire fullness.
Because they are not full, they can wear out without needing renewal.

Chapter 16

Attain utmost emptiness;
maintain steadfast tranquility.
All things arise together,
and I observe their return.
Things flourish in abundance,
yet each returns to its root.
Returning to the root is called tranquility;
it is called returning to destiny.
Returning to destiny is called constant;
knowing the constant is called enlightenment.
Not knowing the constant leads to wild action and misfortune.

Knowing the constant brings tolerance;
tolerance brings impartiality;
impartiality brings royalty;
royalty brings heaven;
heaven brings the Dao;
the Dao brings endurance.
To the end of life, one is free from danger.

Chapter 17

The highest ruler is barely known by those below;
the next is loved and praised;
the next is feared;
the next is despised.

When trust is insufficient, distrust arises.
Hesitant, how sparse are his words!
When his work is done and affairs completed,
the common people all say: "We did it ourselves."

Chapter 18

When the great Dao is abandoned,
there are humaneness and righteousness.
When wisdom and cleverness appear,
there is great hypocrisy.
When family relations are in discord,
there are filial piety and parental affection.
When the state falls into chaos,
there are loyal ministers.

Chapter 19

Banish sageliness, discard wisdom,
and the people will benefit a hundredfold.
Banish humaneness, discard righteousness,
and the people will return to filial piety and affection.
Banish cleverness, discard profit,
and thieves and robbers will disappear.

These three statements are insufficient as an ornament,
so let there be something to attach to:
Manifest plainness, embrace simplicity,
reduce self-interest, lessen desire.

Chapter 20

Give up learning, and troubles end.
How much difference is there between "yes" and "yeah"?
How much difference between good and evil?
What others fear, one cannot fail to fear.
How vast, with no end in sight!

The crowd is merry, as if enjoying a feast,
or climbing a tower in spring.
I alone am still, showing no sign,
like an infant who has not yet smiled;
drifting without a place to call home.
The crowd all has plenty;
I alone seem left with nothing.
Mine is the heart of a fool—so confused!
Ordinary people are bright; I alone am dim.
Ordinary people are sharp; I alone am dull.
Vast like the ocean,
drifting without anchor.
Everyone has a purpose;
I alone am stubborn and uncouth.
I alone am different from others,
for I value seeking nourishment from the Mother.

Chapter 21

The expression of grand virtue
follows the Dao alone.
The Dao as a thing is elusive and vague.
Vague and elusive, within it are images;
elusive and vague, within it are things;
dim and dark, within it is essence.
Its essence is very real;
within it is truth.
From ancient times to the present, its name has never departed,
whereby we inspect the origins of all things.
How do I know the form of all origins?
By this.`,
  },
  {
    pageNumber: 8,
    title: "Chapters 22–27",
    shortTitle: "Ch. 22–27",
    imageSrc: "/manuscripts/pelliot-2584/page-8.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    pieces: [
      { imageSrc: "/manuscripts/pelliot-2584/page-8.jpg", caption: "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)" },
      { imageSrc: "/manuscripts/pelliot-2255/page-8.jpg", caption: P2255_CAPTION },
    ],
    content: `Chapter 22

Yield and remain whole;
bend and be straightened;
empty and be filled;
wear out and be renewed;
have little and gain;
have much and be confused.

Therefore the sage embraces the One
and becomes a model for all under heaven.
He does not show off, and so is illuminated;
he does not justify himself, and so is distinguished;
he does not boast, and so has merit;
he is not arrogant, and so endures.
Because he does not strive, no one under heaven can strive against him.

Is the ancient saying "Yield and remain whole" empty words?
Truly, return to wholeness and belong to it.

Chapter 23

To speak sparingly is natural.
A whirlwind does not last all morning;
a sudden downpour does not last all day.
Who causes these? Heaven and Earth.
If even Heaven and Earth cannot make them last,
how much less can human beings?

Therefore, one who follows the Dao becomes one with the Dao;
one who follows virtue becomes one with virtue;
one who follows loss becomes one with loss.
One who is one with the Dao—the Dao welcomes him;
one who is one with virtue—virtue welcomes him;
one who is one with loss—loss welcomes him.
When trust is insufficient, distrust arises.

Chapter 24

On tiptoe, one cannot stand firm;
striding, one cannot walk far.
Displaying oneself, one is not illuminated;
justifying oneself, one is not distinguished;
boasting, one has no merit;
arrogant, one does not endure.
In terms of the Dao, these are called "excess food and redundant action,"
which all creatures detest.
Therefore, one who possesses the Dao does not dwell in them.

Chapter 25

There is a thing confusedly formed,
born before Heaven and Earth.
Silent and void, it stands alone and changes not,
revolving everywhere without exhaustion;
it can be considered the mother of all under heaven.
I do not know its name;
I style it "Dao."
Forced to give it a name, I call it "Great."

Great means passing on,
passing on means going far,
going far means returning.
Therefore the Dao is great, Heaven is great, Earth is great, and the King is also great.
Within the realm there are four great things,
and the King is one of them.
Humanity models itself on Earth;
Earth models itself on Heaven;
Heaven models itself on the Dao;
the Dao models itself on nature.

Chapter 26

The heavy is the root of the light;
the calm is the master of the hasty.

Therefore the sage travels all day without leaving his heavy baggage.
Though there are splendid sights, he remains calm and unattached.
How can the lord of ten thousand chariots
behave lightly in the world?
Lightness loses the root;
hastiness loses the master.

Chapter 27

A good traveler leaves no tracks;
a good speaker leaves no flaws;
a good counter needs no counting tallies.
A good door needs no bolts, yet cannot be opened;
a good binding needs no ropes, yet cannot be untied.

Therefore the sage is always good at saving people,
so no person is abandoned;
always good at saving things,
so no thing is abandoned.
This is called inheriting enlightenment.

Thus the good person is the teacher of the ungood;
the ungood person is the material for the good.
Not valuing the teacher, not cherishing the material—
though clever, one is deeply confused.
This is called the essential mystery.`,
  },
  {
    pageNumber: 9,
    title: "Chapters 28–31",
    shortTitle: "Ch. 28–31",
    imageSrc: "/manuscripts/pelliot-2584/page-9.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    pieces: [
      { imageSrc: "/manuscripts/pelliot-2584/page-9.jpg", caption: "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)" },
      { imageSrc: "/manuscripts/pelliot-2255/page-9.jpg", caption: P2255_CAPTION },
    ],
    content: `Chapter 28

Know the male, but preserve the female,
and be the ravine of the world.
Being the ravine of the world,
constant virtue will not depart,
and you will return to the state of an infant.

Know the white, but preserve the black,
and be the pattern for the world.
Being the pattern for the world,
constant virtue will not falter,
and you will return to the limitless.

Know glory, but preserve disgrace,
and be the valley of the world.
Being the valley of the world,
constant virtue will be sufficient,
and you will return to uncarved simplicity.

When uncarved simplicity is dispersed, it becomes vessels.
The sage uses it and becomes the leader of officials.
Thus the great carving does not cut.

Chapter 29

If someone wishes to take the world and act upon it,
I see that he will not succeed.
The world is a sacred vessel,
and cannot be acted upon.
One who acts upon it ruins it;
one who grasps it loses it.

For all things: some lead, some follow;
some breathe softly, some blow hard;
some are strong, some are weak;
some sustain, some destroy.

Therefore the sage avoids excess, extravagance, and arrogance.

Chapter 30

One who assists a ruler through the Dao
does not force the world with weapons.
Such deeds tend to rebound.
Where armies camp, thorns and brambles grow.
In the wake of great wars, bad harvest years follow.

Be good at achieving results and stop,
not daring to use force for mastery.
Achieve results without boasting,
achieve results without arrogance,
achieve results without pride,
achieve results out of necessity,
achieve results without violence.

Things age after reaching their peak;
this is called not following the Dao.
What does not follow the Dao comes to an early end.

Chapter 31

Fine weapons are instruments of ill omen;
all creatures detest them.
Therefore, one who possesses the Dao does not abide with them.
The gentleman in peace values the left;
in war, he values the right.
Weapons are instruments of ill omen, not the tools of a gentleman.
Use them only when unavoidable,
with restraint and calm as highest.
Victory should not be celebrated.
To celebrate victory is to delight in killing people.
One who delights in killing people
cannot achieve his will in the world.

On auspicious occasions, the left side is honored;
on tragic occasions, the right side is honored.
The second in command stands on the left;
the supreme commander stands on the right.
This means placing it according to funeral rites.
When vast numbers of people are killed, weep for them with sorrow and grief.
A victory in war should be conducted according to funeral rites.`,
  },
  {
    pageNumber: 10,
    title: "Chapters 32–37",
    shortTitle: "Ch. 32–37",
    imageSrc: "/manuscripts/pelliot-2584/page-10.jpg",
    caption:
      "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)",
    pieces: [
      { imageSrc: "/manuscripts/pelliot-2584/page-10.jpg", caption: "Pelliot chinois 2584, Bibliothèque nationale de France (via the International Dunhuang Project)" },
      { imageSrc: "/manuscripts/pelliot-2255/page-10.jpg", caption: P2255_CAPTION },
    ],
    content: `Chapter 32

The Dao is constant and unnameable.
Though uncarved simplicity is small,
no one in the world can make it a servant.
If lords and kings could preserve it,
the ten thousand things would pay homage of themselves.
Heaven and Earth unite to drip sweet dew,
falling evenly on the people without being commanded.

When regulations begin, names arise.
Once names arise, one should know when to stop.
Knowing when to stop prevents danger.
The Dao's presence in the world
is like rivers and streams flowing into the sea.

Chapter 33

Knowing others is intelligence;
knowing oneself is enlightenment.
Overcoming others requires force;
overcoming oneself requires strength.
Knowing contentment is wealth;
persevering in action requires will.
Not losing one's place endures;
dying without perishing brings longevity.

Chapter 34

The great Dao flows everywhere,
it can go left or right.
The ten thousand things depend on it for life, and it does not refuse them.
Its merit accomplished, it claims no possession.
It clothes and nourishes the ten thousand things, yet does not act as master.
Ever without desire, it may be named small.
The ten thousand things return to it, yet it does not act as master;
it may be named great.
Because it never considers itself great,
it is able to achieve its greatness.

Chapter 35

Hold fast to the Great Image,
and all under heaven will come.
They come and suffer no harm,
finding peace, rest, and tranquility.
Music and food cause passing guests to stop.
When the Dao is spoken from the mouth,
it is tasteless and without flavor.
Look at it, it cannot be seen;
listen to it, it cannot be heard;
use it, it cannot be exhausted.

Chapter 36

What is to be shrunk must first be stretched.
What is to be weakened must first be strengthened.
What is to be cast down must first be raised up.
What is to be taken must first be given.
This is called subtle enlightenment.
The soft and weak overcome the hard and strong.
Fish should not be taken out of the deep pool;
the sharp instruments of the state should not be displayed to the people.

Chapter 37

The Dao is constantly without action,
yet nothing is left undone.
If lords and kings can preserve it,
the ten thousand things will transform of themselves.
Transforming, if desires arise,
I will quell them with uncarved simplicity.
Uncarved simplicity is without desire.
Without desire, there is tranquility,
and heaven and earth will correct themselves.`,
  },
  {
    pageNumber: 11, title: "Chapters 38–42", shortTitle: "Ch. 38–42", imageSrc: "/manuscripts/pelliot-2255/page-11.jpg", caption: P2255_CAPTION,
    content: `The piece opens with this copy's part headers: 老子道經上 (Laozi's Daojing — Upper Part) and 老子德經下 (Laozi's Dejing — Lower Part). Note that this manuscript calls the lower part "Dejing" rather than "Daojing."

Chapter 38

The highest virtue does not hold itself to be virtuous; therefore it has virtue. Lesser virtue never loses sight of virtue; therefore it has no virtue. The highest virtue does not act, and has no motive for acting. Lesser virtue acts, and has a motive for acting. Highest humaneness acts without motive. Highest righteousness acts with motive. Highest ritual acts; when no one responds, it rolls up its sleeves and forces compliance.

Therefore, when the Dao is lost, virtue follows; when virtue is lost, humaneness follows; when humaneness is lost, righteousness follows; when righteousness is lost, ritual follows. Ritual is the thinning of trust and fidelity, the beginning of disorder. Foreknowledge is the flower of the Dao, the beginning of folly. Therefore the great person dwells in what is substantial, not in what is thin; in the fruit, not the flower. He takes this and leaves that.

Chapter 39

Those that gained the One in ancient times: Heaven gained the One and became clear; Earth gained it and became stable; spirits gained it and became potent; valleys gained it and became full; the ten thousand things gained it and came to life; rulers and kings gained it and became models for the world. All of this came from the One.

Without clarity Heaven would split; without stability Earth would collapse; without potency spirits would fade; without fullness valleys would dry; without life things would perish; without a model rulers and kings would fall. Thus the noble takes the lowly as its root; the high takes the low as its foundation. That is why rulers call themselves orphaned, lonely, and unworthy. Is this not taking the lowly as root? Too much honor brings no honor. Do not want to glitter like jade; be rough like stone.

Chapter 40

Returning is the movement of the Dao. Weakness is the use of the Dao. All things under heaven are born from being; being is born from non-being.

Chapter 41

When a superior person hears of the Dao, he practices it diligently. When an average person hears of the Dao, he sometimes keeps it and sometimes loses it. When an inferior person hears of the Dao, he laughs loudly. If he did not laugh, it would not be the Dao.

Thus it is said: the bright Dao seems dark; the advancing Dao seems to retreat; the level Dao seems uneven; great virtue seems like a valley; pure white seems stained; abundant virtue seems insufficient; established virtue seems weak; simple truth seems changeable. The great square has no corners; the great vessel is slow to complete; the great sound is seldom heard; the great image has no form. The Dao is hidden and nameless, yet it alone is good at giving and completing.

Chapter 42

The Dao gives birth to One. One gives birth to two. Two gives birth to three. Three gives birth to the ten thousand things. The ten thousand things carry yin and embrace yang; blending their vital breaths, they achieve harmony. What people hate most is to be orphaned, lonely, and unworthy, yet rulers call themselves by these names. Thus things may be diminished and thereby increased, or increased and thereby diminished. What others teach, I also teach: the violent and unyielding do not die a natural death. I make this the father of my teaching.`,
  },
  {
    pageNumber: 12, title: "Chapters 43–50", shortTitle: "Ch. 43–50", imageSrc: "/manuscripts/pelliot-2255/page-12.jpg", caption: P2255_CAPTION,
    content: `Chapter 43

The softest thing under heaven rides over the hardest. Non-being enters where there is no space. From this I know the benefit of non-action. Teaching without words and the benefit of non-action are rarely attained in the world.

Chapter 44

Which is dearer, fame or the body? Which is worth more, the body or goods? Which brings greater harm, gaining or losing? Great attachment surely brings great expense; much hoarding surely brings heavy loss. Knowing contentment avoids disgrace; knowing when to stop avoids danger; thus one can endure long.

Chapter 45

Great perfection seems flawed, yet its use is never exhausted. Great fullness seems empty, yet its use never runs dry. Great straightness seems bent; great skill seems clumsy; great eloquence seems hesitant. Motion overcomes cold; stillness overcomes heat. Clear stillness sets the world right.

Chapter 46

When the world has the Dao, swift horses are used to haul manure. When the world lacks the Dao, warhorses breed in the borderlands. No disaster is greater than not knowing contentment; no fault is greater than the desire to possess. Therefore the contentment of knowing contentment is lasting contentment.

Chapter 47

Without going out the door, know the world. Without looking through the window, see the Dao of Heaven. The farther one goes, the less one knows. Therefore the sage knows without traveling, sees without looking, accomplishes without acting.

Chapter 48

In pursuing learning, one gains daily. In pursuing the Dao, one loses daily. Lose and lose again, until reaching non-action. Through non-action, nothing is left undone. To govern the world, remain free of meddling. If one meddles, one is not fit to govern the world.

Chapter 49

The sage has no fixed heart; he takes the hearts of the people as his heart. To the good, I am good; to the not-good, I am also good: this is goodness. To the trustworthy, I am trustworthy; to the untrustworthy, I am also trustworthy: this is trustworthiness. The sage lives in the world with care and blends his heart with all. The people all look and listen to him; the sage treats them as children.

Chapter 50

Coming forth is life; entering is death. Of those who live, three in ten are companions of life; of those who die, three in ten are companions of death; and three in ten, though alive, move toward death because they cling too fiercely to living. I have heard that one good at preserving life travels among rhinoceroses and tigers without meeting them, and enters armies without armor or weapons. The rhinoceros finds nowhere to thrust its horn, the tiger nowhere to sink its claws, weapons nowhere to enter their blades. Why? Because in him there is no place for death to enter.`,
  },
  {
    pageNumber: 13, title: "Chapters 51–56", shortTitle: "Ch. 51–56", imageSrc: "/manuscripts/pelliot-2255/page-13.jpg", caption: P2255_CAPTION,
    content: `Chapter 51

The Dao gives them life; virtue raises them. Things give them form; circumstances complete them. Therefore all things honor the Dao and value virtue. The Dao is honored and virtue valued without command: it is always so of itself. The Dao gives life, raises, nourishes, shelters, matures, supports, and protects. It gives life without possessing, acts without relying on it, and leads without dominating. This is called mysterious virtue.

Chapter 52

The world has a beginning; it is the mother of the world. Knowing the mother, know the children. Knowing the children, return and hold to the mother: to the end of life, one is free from danger. Close the openings, shut the doors, and life brings no toil. Open the openings, pursue affairs, and life cannot be saved. Seeing the small is called clarity; preserving softness is called strength. Use the light, return to the clarity, and avoid bringing disaster upon yourself. This is called following the constant.

Chapter 53

If I have even a little understanding, I walk the great Dao and fear only straying from it. The great Dao is very level, but people prefer side paths. Courts are splendid, fields are overgrown, granaries empty; yet people wear embroidered clothes, carry sharp swords, gorge on food and drink, and possess more than enough. This is called robbery and boasting, not the Dao.

Chapter 54

What is well planted cannot be uprooted; what is well held cannot be taken away. It will be honored by descendants without end. Cultivate it in yourself, and virtue will be genuine. Cultivate it in the family, and virtue will abound. Cultivate it in the village, and virtue will endure. Cultivate it in the state, and virtue will flourish. Cultivate it in the world, and virtue will be universal. Therefore observe others through yourself, families through your family, villages through your village, states through your state, and the world through the world. How do I know the world is so? By this.

Chapter 55

One filled with virtue is like a newborn child. Poisonous insects do not sting it, fierce beasts do not seize it, birds of prey do not claw it. Its bones are weak and its sinews soft, yet its grip is firm. It knows nothing of joining male and female, yet its organ is aroused: its vital essence is at its height. It cries all day without becoming hoarse: its harmony is at its height. Knowing harmony is called constant; knowing the constant is called clarity. To force life to flourish is ominous. When the heart commands the vital breath, it becomes hard. Things grow strong and then grow old: this is called not following the Dao; what does not follow the Dao comes to an early end.

Chapter 56

Those who know do not speak; those who speak do not know. Close the openings, shut the doors; blunt sharpness, untangle knots; soften glare, merge with dust. This is called mysterious sameness. Therefore one cannot be intimate with it or distant from it, benefit it or harm it, honor it or demean it. Thus it is the most honored thing under heaven.`,
  },
  {
    pageNumber: 14, title: "Chapters 57–62", shortTitle: "Ch. 57–62", imageSrc: "/manuscripts/pelliot-2255/page-14.jpg", caption: P2255_CAPTION,
    content: `Chapter 57

Govern a state with uprightness; use surprise in war; take the world by not meddling. How do I know this is so? By this: the more prohibitions there are, the poorer the people become. The more sharp tools people have, the more troubled the state becomes. The more cleverness people have, the more strange things arise. The more laws and orders are proclaimed, the more thieves and robbers appear. Therefore the sage says: I do nothing, and the people transform themselves. I love stillness, and the people correct themselves. I do not meddle, and the people prosper. I have no desires, and the people become simple.

Chapter 58

When government is dull, the people are honest. When government is sharp, the people are cunning. Misfortune leans on good fortune; good fortune hides misfortune. Who knows where either will end? There is no fixed standard. The straight turns strange; the good turns monstrous. The people's confusion has lasted long. Therefore the sage is square but does not cut, pointed but does not pierce, straight but not harsh, bright but not dazzling.

Chapter 59

In ruling people and serving Heaven, nothing equals thrift. Thrift means early preparation; early preparation means accumulating virtue. With accumulated virtue, nothing cannot be overcome. When nothing cannot be overcome, no one knows the limit. When no one knows the limit, one can possess a state. Possessing the mother of a state, one can endure long. This is called deep roots and a firm base, the Dao of long life and lasting vision.

Chapter 60

Governing a great state is like cooking a small fish. When the world is ruled by the Dao, spirits do not harm people; not that spirits lack power, but their power does not harm people. Nor does the sage harm people. Since neither harms, their virtues return to the people.

Chapter 61

A great state is like the lower reaches of a river: the meeting place of the world, the female of the world. The female always overcomes the male through stillness; through stillness she takes the lower place. Therefore a great state, by lowering itself before a small state, wins the small state; a small state, by lowering itself before a great state, wins the great state. Some lower themselves to win, others lower themselves and are won. A great state wants only to gather and nourish people; a small state wants only to join and serve. If each gets what it wants, the great should take the lower place.

Chapter 62

The Dao is the refuge of all things: a treasure to the good, a shelter to the not-good. Fine words can gain honor; fine deeds can raise a person. Why cast aside those who are not good? Therefore, when a ruler is installed and three ministers appointed, though one may offer jade and teams of horses, it is better to sit and offer this Dao. Why did the ancients value the Dao? Is it not because those who seek find, and those with faults are forgiven? Therefore it is the most valued thing under heaven.`,
  },
  {
    pageNumber: 15, title: "Chapters 63–67", shortTitle: "Ch. 63–67", imageSrc: "/manuscripts/pelliot-2255/page-15.jpg", caption: P2255_CAPTION,
    content: `Chapter 63

Act through non-action; work without forcing; taste the tasteless. See the great in the small and the many in the few. Repay resentment with virtue. Plan for what is difficult while it is easy; do what is great while it is small. The difficult things of the world begin in what is easy; the great things of the world begin in what is small. Therefore the sage never does what is great, and so achieves greatness. One who makes light of promises will have little trust; one who finds everything easy will meet much difficulty. Therefore the sage treats things as difficult, and in the end has no difficulty.

Chapter 64

What is at rest is easy to hold; what has not appeared is easy to plan for; what is brittle is easy to break; what is tiny is easy to scatter. Deal with things before they exist; set them in order before disorder arises. A tree too large to embrace begins as a tiny shoot. A terrace nine stories high begins with a basket of earth. A journey of a thousand miles begins beneath one's feet. Those who act spoil; those who grasp lose. Therefore the sage does not act and so does not spoil; does not grasp and so does not lose. People often fail when they are close to success. Be as careful at the end as at the beginning, and there will be no failure. Therefore the sage desires desirelessness and does not value rare goods; learns not-learning and returns to what people overlook. He helps all things be natural, and does not dare to act.

Chapter 65

Those who were good at practicing the Dao in ancient times did not use it to make people clever, but to keep them simple. People are hard to govern because they have too much cleverness. To govern a state by cleverness is to rob the state; to govern it without cleverness is a blessing. Knowing these two is the model. Constantly knowing the model is called mysterious virtue. Mysterious virtue is deep and far-reaching; it returns with things to the great harmony.

Chapter 66

Why can rivers and seas be kings of a hundred valleys? Because they are good at taking the lower place. Therefore they are kings of a hundred valleys. So the sage, wishing to stand above people, must speak as though below them; wishing to lead people, must place himself behind them. Thus he stands above and they do not feel burdened; he leads and they do not feel harmed. The world gladly supports him and does not tire of him. Because he does not contend, no one can contend with him.

Chapter 67

Everyone says my Dao is great and seems unlike anything else. It is great precisely because it seems unlike anything else. If it resembled other things, it would long ago have become small. I have three treasures which I hold and keep: the first is compassion, the second frugality, the third not daring to be first in the world. Through compassion one can be courageous; through frugality one can be generous; through not daring to be first one can become a leader. To be courageous without compassion, generous without frugality, or first without holding back is death. Compassion wins in attack and is firm in defense. Whomever Heaven would save, it protects with compassion.`,
  },
  {
    pageNumber: 16, title: "Chapters 68–74", shortTitle: "Ch. 68–74", imageSrc: "/manuscripts/pelliot-2255/page-16.jpg", caption: P2255_CAPTION,
    content: `Chapter 68

A good warrior is not warlike. A good fighter is not angry. A good conqueror does not engage the enemy. A good user of people puts himself below them. This is called the virtue of not contending, the power of using people, matching Heaven's ancient limit.

Chapter 69

In using troops there is a saying: I dare not be the host but would rather be the guest; I dare not advance an inch but would rather retreat a foot. This is called advancing without advancing, rolling up sleeves without baring arms, grasping without weapons, attacking without enemies. No disaster is greater than underestimating an enemy. Underestimating an enemy nearly loses my treasures. Therefore when equal armies meet, the compassionate one wins.

Chapter 70

My words are easy to understand and easy to practice, yet no one in the world can understand or practice them. My words have an ancestor; my deeds have a master. Because people do not understand this, they do not understand me. Those who understand me are few, and therefore I am valued. The sage wears coarse clothes and carries jade within.

Chapter 71

To know that one does not know is best. Not to know, yet think one knows, is sickness. Only by being sick of sickness can one be free of sickness. The sage is free of sickness because he is sick of sickness. Therefore he is not sick.

Chapter 72

When people no longer fear authority, a greater authority arrives. Do not crowd their homes; do not press their lives. If you do not press them, they will not grow weary. Therefore the sage knows himself but does not display himself; loves himself but does not exalt himself. He takes this and leaves that.

Chapter 73

Those bold in daring are killed; those bold in not daring live. Of these two, one brings benefit and one brings harm. Who knows why Heaven dislikes what it dislikes? Even the sage finds it difficult. The Dao of Heaven does not contend, yet it prevails; does not speak, yet it answers; does not summon, yet things come; is at ease, yet plans well. Heaven's net is vast and wide; though its mesh is loose, nothing slips through.

Chapter 74

If people do not fear death, why frighten them with death? If people always feared death, and those who did wrong could be seized and killed, who would dare? There is always an executioner who kills. To kill in place of that executioner is like hewing wood in place of a master carpenter: those who do so rarely escape cutting their own hands.`,
  },
  {
    pageNumber: 17, title: "Chapters 75–81", shortTitle: "Ch. 75–81", imageSrc: "/manuscripts/pelliot-2255/page-17.jpg", caption: P2255_CAPTION,
    content: `Chapter 75

People starve because their rulers consume too much tax grain. Therefore they starve. People are hard to govern because their rulers meddle. Therefore they are hard to govern. People take death lightly because they strive to live too richly. Therefore they take death lightly. Those who do not strive to live are wiser than those who prize life.

Chapter 76

When living, people are soft and yielding; when dead, hard and rigid. Grass and trees, when living, are soft and pliant; when dead, dry and brittle. Thus rigidity and hardness are companions of death; softness and yielding are companions of life. Therefore a hard and mighty army will be defeated; a hard and mighty tree will be cut down. The great and strong take the lower place; the soft and yielding take the higher.

Chapter 77

The Dao of Heaven is like drawing a bow: it lowers what is high and raises what is low; reduces what has too much and supplies what has too little. The Dao of Heaven reduces excess to supply what lacks. The way of people is not so: they take from what lacks to offer what has excess. Who can have more than enough and offer it to the world? Only one who has the Dao. Therefore the sage acts without possessing, accomplishes without dwelling on achievement, and does not wish to display his worth.

Chapter 78

Nothing under heaven is softer or weaker than water; yet nothing is better at attacking the hard and strong. Nothing can take its place. Everyone knows that the soft overcomes the hard and the weak overcome the strong, but no one can practice it. Therefore the sage says: one who bears a state's disgrace is fit to rule its altars; one who bears the world's misfortune is fit to rule the world. True words seem contrary.

Chapter 79

After a great resentment is settled, resentment must remain. How can this be good? Therefore the sage keeps the left half of the tally and does not demand payment from others. The virtuous attend to the tally; those without virtue attend to collecting. The Dao of Heaven has no favorites; it is always with the good.

Chapter 80

Let there be a small state with few people. Let tools that can serve ten or a hundred be available, but not used. Let people value death and not travel far. Though they have boats and carriages, no one rides them. Though they have armor and weapons, no one displays them. Let people return to knotting cords and using them. Let their food be sweet, their clothes beautiful, their homes peaceful, and their customs joyful. Neighboring states can see one another and hear each other's dogs and chickens, yet their people grow old and die without visiting one another.

Chapter 81

Trustworthy words are not beautiful…`,
  },
  {
    pageNumber: 18, title: "Chapter 81 and Colophon", shortTitle: "Ch. 81 & colophon", imageSrc: "/manuscripts/pelliot-2255/page-18.jpg", caption: P2255_CAPTION,
    content: `Chapter 81

Beautiful words are not trustworthy. Good people do not argue; those who argue are not good. Those who know are not widely learned; the widely learned do not know. The sage does not store up. The more he does for others, the more he has; the more he gives to others, the more he possesses. The Dao of Heaven benefits and does not harm. The Dao of the sage acts and does not contend.

Closing colophon

The closing colophon records this copy's totals: the upper part has 37 chapters and 2,184 characters; the lower part has 44 chapters and 2,815 characters. Together they make 81 chapters and 4,999 characters — the "five thousand characters." It also notes the Heshang Gong (Master by the River) chapter divisions.

The copy is dated the 28th day of the 6th month of Tianbao 10 (751 CE), in the Tang dynasty, and identifies its maker as a lay disciple.`,
    isLastPage: true,
  },
];

export function getManuscriptPage(pageNumber: number): ManuscriptPageData | undefined {
  return MANUSCRIPT_PAGES.find((p) => p.pageNumber === pageNumber);
}

export function getManuscriptPageContext(page: ManuscriptPageData): string {
  const manuscriptNames =
    page.pageNumber >= 7 && page.pageNumber <= 10
      ? 'Pelliot chinois 2584 and Pelliot chinois 2255'
      : page.pageNumber >= 11
        ? 'Pelliot chinois 2255'
        : 'Pelliot chinois 2584';
  return `You are discussing manuscript page ${page.pageNumber} (${page.title}), ${manuscriptNames}`;
}

