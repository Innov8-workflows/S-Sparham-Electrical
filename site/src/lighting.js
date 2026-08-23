/* ============================================================
   LIGHTING GUIDES - content

   A /lighting/ section: a hub plus one page per style of fitting.

   WHAT THESE ARE. Guides to what is involved in fitting each style, and what
   is worth checking before buying one. They exist because the sales
   conversation ("what sort of light do you want?") goes better with something
   to point at, and because "who fits chandeliers near me" is a real search
   that the general lighting service page does not answer well.

   WHAT THESE ARE NOT. Not a product catalogue. The client sent three retailer
   sites as examples of the STYLES he means, and none of them is named here:
   their photographs and product copy are theirs, and reproducing either on a
   commercial site is infringement. No prices, in line with the rest of the site.

   SUPPLY. Stephen BUYS AND FITS (confirmed 2026-08-22). That is why the
   check-lists below read as what HE checks rather than as homework for the
   customer: the pitch is "tell us the look you want and we will source
   something that actually works in your room", which is a stronger offer than
   a list of things for them to get wrong on a retailer's website.

   The pages still accept a fitting the customer has already bought, because
   plenty of people buy a light they love before they ring an electrician and
   turning that work away would be daft. Supply is the lead, not the condition.

   `photo` is null where we have no photograph of that style. The page then runs
   on copy alone rather than borrowing an image of something else, and the gap
   is listed in pending.lightingPhotos.
   ============================================================ */

const guides = [
  {
    slug: 'chandeliers',
    nav: 'Chandeliers',
    h1: 'Chandelier and statement light installation',
    title: 'Chandelier Installation',
    icon: 'lightbulb',
    blurb: 'Heavy statement fittings hung safely, from the ceiling fixing up.',
    bg: 'g2.jpg',
    photo: null,
    answer: 'Fitting a chandelier is mostly a question of weight and what is above the ceiling. A standard plasterboard ceiling rose is rated for a few kilograms; a multi-arm chandelier can be fifteen or more, and it has to be fixed to a joist or to timber noggins put in specially, never to the plasterboard itself. Beyond that it is drop height, whether the ceiling is high enough to sit one at all, and whether the switching and any dimming suit a fitting with that many lamps in it.',
    intro: 'A chandelier is the one light in a house that people notice from the doorway, and it is also the one most likely to be hung off something that will not hold it. The fitting itself is usually the easy part. Everything worth thinking about happens before it goes up.',
    checkTitle: 'What decides whether a chandelier will work',
    checks: [
      ['Weight', 'The single most important number, and the one most product pages bury. Anything over about 5kg needs fixing into timber rather than into a plasterboard ceiling. We check it against your ceiling before anything is ordered, which is the whole reason nothing arrives that will not go up.'],
      ['Drop and ceiling height', 'Most chandeliers have an adjustable drop, but there is a minimum. Over a table you want the bottom of it roughly 75 to 85cm above the surface; anywhere people walk, high enough that nobody meets it. In a room with a standard 2.4m ceiling a long-drop fitting will not work.'],
      ['Number and type of lamps', 'A twelve-arm fitting is twelve lamps to change. Check they are a type you can still buy easily, and whether they are included. If you want it dimmed, they all need to be dimmable and all the same.'],
      ['Where the existing point is', 'Ceiling roses are rarely in the middle of the room, and almost never in the middle of a room that has been extended or knocked through. Moving the point is straightforward with the ceiling open and more involved once it is finished.'],
      ['Stairwells and double-height spaces', 'A fitting hung over a stairwell has to be installable and, more to the point, cleanable and re-lampable afterwards. That usually decides the drop more than the look does.']
    ],
    process: [
      ['Look at the ceiling first', 'We check what is above the plasterboard, find the joists, and work out whether the existing point is fixed to anything that will take the weight. This is the part that decides whether it is a straightforward job.'],
      ['Make the fixing good', 'Where there is nothing solid in the right place, timber noggins go in between the joists so the fitting is hung off structure rather than off a sheet of plasterboard.'],
      ['Position and drop', 'The fitting is set at the height it should sit at, checked from where people will actually stand and sit rather than from up a ladder.'],
      ['Wire, hang and test', 'Connected, hung, levelled, and the circuit tested. If it is going on a dimmer, the dimmer is matched to the lamps so it does not buzz or flicker.']
    ],
    faqs: [
      ['How heavy a chandelier can a normal ceiling take?', 'A plasterboard ceiling with a standard rose is good for only a few kilograms. Past that the fitting needs to be fixed into a joist, or into noggins put in between the joists specially. There is no single number that covers every ceiling, which is why it is worth asking before ordering rather than after.'],
      ['Can you move the ceiling point to where I want it?', 'Usually. How involved it is depends on what is above: with a floor above and boards that lift, it is straightforward, and on a top-floor ceiling with loft access it is easier still. Where neither applies it can mean lifting or opening a small section of ceiling, which is worth knowing before you decide.'],
      ['How high should it hang over a dining table?', 'As a rule of thumb the bottom of the fitting sits about 75 to 85cm above the table. Lower feels intimate but gets in the way of seeing across; higher stops lighting the table properly. It is worth holding it at a couple of heights before fixing.'],
      ['Can a chandelier go on a dimmer?', 'Yes, provided every lamp in it is dimmable and they are all the same type. The usual problem is a fitting sold with non-dimmable LED lamps, or a mix, on an old dimmer designed for filament bulbs. A trailing-edge dimmer rated for the load fixes most of it.']
    ]
  },
  {
    slug: 'pendant-lights',
    nav: 'Pendant lights',
    h1: 'Pendant light installation',
    title: 'Pendant Light Installation',
    icon: 'lightbulb',
    blurb: 'Single drops and runs over islands and tables, set out and hung level.',
    bg: 'g5.jpg',
    photo: ['g5.jpg', 'Three glass pendant lights hung in a row over a kitchen island, with downlights set through the ceiling beyond'],
    answer: 'A pendant is a light on a flex or rod hung from the ceiling, and the thing that decides whether a run of them looks right is the setting out: spacing, height, and whether they line up with what is underneath rather than with the ceiling. Three over an island want to be evenly spaced on the island, centred on it, and hung at a height that lights the worktop without blocking the eyeline of somebody sitting at it. Getting that wrong is far more noticeable than the fitting itself.',
    intro: 'Pendants are the most common decorative fitting we put up, and the one where the difference between a careful job and a quick one is most visible. A row hung off the existing ceiling points, rather than off the island they are meant to light, never quite looks deliberate.',
    checkTitle: 'What decides how a run of pendants looks',
    checks: [
      ['How many, and how wide the space is', 'Three over a two-metre island is the usual answer; two on a shorter run. Better to decide the number against the actual measurement than to buy a set and make it fit.'],
      ['Adjustable drop', 'Almost all pendants have an adjustable flex or rod, but check the range. Over an island you generally want the bottom of the shade around 75 to 90cm above the worktop, and higher in a room with a low ceiling.'],
      ['Shade shape and what it does with the light', 'An open-bottomed shade throws light down onto the worktop. A fully enclosed opal globe glows and lights the room more softly, which looks lovely and is less useful for chopping on.'],
      ['Whether they are on their own switch', 'Pendants over an island want to be switchable separately from the downlights, or the room only has one setting. Worth deciding before the wiring is done, not after.'],
      ['Ceiling type and where the joists run', 'Evenly spaced pendants rarely line up with the joists. Where they do not, the fixings need timber putting in between, which is quick with the ceiling open and more of a job once it is finished.']
    ],
    process: [
      ['Set the positions out', 'Marked against the island or table, measured, and checked from standing and sitting height before anything is cut or fixed.'],
      ['Sort the fixings', 'Noggins between the joists where the position does not land on one, so each pendant is hung off timber.'],
      ['Wire and switch', 'Run back to the board or the existing circuit, with the pendants switched as their own group so the room can be lit more than one way.'],
      ['Hang, level and set the height', 'Each drop set to the same height, checked along the run by eye as well as by tape, because a run that is level on paper and out by a centimetre is the thing people see.']
    ],
    faqs: [
      ['How many pendants do I need over my island?', 'Three is the usual answer over an island of about two metres, two over something shorter. What matters more is that they are evenly spaced along the island and centred on it, rather than spaced to suit the ceiling.'],
      ['How high should pendants hang over a worktop?', 'Around 75 to 90cm from the worktop to the bottom of the shade is the normal range. Lower if it is purely decorative and nobody needs to see across it, higher in a room with a low ceiling or where people will be sitting facing each other.'],
      ['Can you add pendants where there is no ceiling point?', 'Yes. New points are run from the existing lighting circuit, and how involved that is depends on access from above. It is much easier while a ceiling is open, so it is worth raising early if a kitchen is being done.'],
      ['Will they line up with my existing downlights?', 'Not automatically, and forcing them to is usually the wrong call. Pendants should line up with the island or table; downlights should be set out around the tasks in the room. If the two fight, it is generally the downlights that want moving.']
    ]
  },
  {
    slug: 'downlights',
    nav: 'Downlights',
    h1: 'Downlights and spotlights',
    title: 'Downlight and Spotlight Installation',
    icon: 'sun',
    blurb: 'Recessed lighting set out around the room rather than in a grid.',
    bg: 'g6.jpg',
    photo: ['g6.jpg', 'Recessed downlights set through the ceiling of a renovated room with an exposed stone wall and a slatted oak feature wall'],
    answer: 'Downlights are recessed fittings set into the ceiling, and the two things that decide whether they work are how many there are and where they go. A regular grid of identical downlights is the default and is almost always wrong: it over-lights the middle of the floor and leaves the worktops, corners and seating under-lit. Setting them out around what the room is actually used for takes fewer fittings and gives a better result. In a ceiling with a room above, they must be fire-rated so the fire resistance of the ceiling is maintained where holes have been cut in it.',
    intro: 'Downlights are the fitting people most often end up with too many of. The instinct is to space them evenly across the ceiling, which is easy to mark out and produces a room lit like an office. A few in the right places beats a lot in neat rows.',
    checkTitle: 'What has to be right with downlights',
    checks: [
      ['Fire rating', 'In any ceiling with a habitable room above, the fittings need to be fire-rated. Cutting holes in a ceiling removes part of what stops a fire spreading between floors, and a fire-rated fitting puts that back.'],
      ['Beam angle', 'A narrow beam makes a pool of light and a lot of shadow. A wider one washes the room more evenly. Kitchens generally want wider over the working areas; a narrow beam is for picking out something specific.'],
      ['Colour temperature', 'Around 2700K is warm and suits living rooms and bedrooms; 3000K is slightly crisper and common in kitchens and bathrooms. 4000K and above reads cold in a home. Be consistent within a room, because mixing them is very obvious.'],
      ['Dimmable, and on what', 'If you want them dimmed, check the fittings are dimmable and pair them with a trailing-edge dimmer rated for LED. Old dimmers built for filament lamps need a minimum load LEDs never draw, which is what causes buzzing and flicker.'],
      ['Fixed or adjustable', 'Adjustable heads let you aim light at a wall, a worktop or a picture. Fixed ones point straight down. Adjustable are worth it anywhere you want to light something rather than just light the room.'],
      ['Cut-out size', 'Matters when replacing existing downlights: matching the cut-out means no making good, and a different one means filling and repainting the ceiling. We measure before ordering.']
    ],
    process: [
      ['Work out what the room is for', 'Where you stand, sit and work, and which surfaces need light. That drives the layout rather than the shape of the ceiling.'],
      ['Set out and check for joists', 'Positions marked before anything is cut, and checked against the joists and any pipework or cables above. The layout gets adjusted around what is up there rather than into it.'],
      ['Cut, wire and fit', 'Cut cleanly, wired, and the fittings seated square to the ceiling. Crooked downlights are permanent and very visible.'],
      ['Set up the dimming and clean down', 'Dimmer matched to the load, then the room cleaned down. Cutting downlights makes a remarkable amount of dust and it gets everywhere if nobody bothers.']
    ],
    faqs: [
      ['How many downlights does a room need?', 'Fewer than most people expect. It depends on ceiling height, beam angle and output, but a regular grid usually over-lights the middle of the floor and under-lights the places you actually use. Setting them out around the tasks in the room generally means fewer fittings and a better result.'],
      ['Do downlights need to be fire-rated?', 'In a ceiling with a habitable room above, yes. Cutting holes removes part of the fire resistance between floors, and a fire-rated fitting restores it. In a top-floor ceiling with only a loft above the requirement is different, but they are cheap enough that it is rarely worth the distinction.'],
      ['Why do my LED downlights flicker on the dimmer?', 'Almost always a compatibility problem rather than a fault. Older dimmers were designed for filament bulbs and need a minimum load that LEDs never draw. A trailing-edge dimmer rated for LED, matched to the fittings, is normally the fix.'],
      ['Can you replace my old halogen downlights with LED?', 'Yes, and it is one of the most worthwhile swaps there is: far less heat, far less power, and lamps that last years rather than months. If the cut-out sizes match there is no making good. If they do not, the ceiling needs filling and painting where the old ones were.']
    ]
  },
  {
    slug: 'wall-lights',
    nav: 'Wall lights',
    h1: 'Wall lights and picture lights',
    title: 'Wall Light Installation',
    icon: 'lightbulb',
    blurb: 'Wall fittings, reading lights and picture lights, wired in properly.',
    bg: 'g7.jpg',
    photo: ['g7.jpg', 'A brass wall light fitted above a vanity, next to an illuminated LED mirror in a renovated bathroom'],
    answer: 'Wall lights do the job a ceiling light cannot: they put light at eye level and take the flatness out of a room. The practical question is almost always how the cable gets there. On a stud wall it is straightforward; on a solid wall it means chasing, which is fine while a room is being decorated and disruptive once it is finished. Height matters too, and the usual mistake is fitting them too high.',
    intro: 'A room lit only from the ceiling looks like a room lit only from the ceiling. Wall lights are what makes an evening setting possible, and they are also the fitting most worth planning before the plasterer arrives rather than after.',
    checkTitle: 'What decides where wall lights can go',
    checks: [
      ['Height', 'Around 1.5 to 1.7m from the floor suits most wall lights in a living room, a little lower either side of a bed. Too high and they light the ceiling; too low and you look into the lamp when seated.'],
      ['Which way the light goes', 'Uplighters wash the ceiling and make a room feel taller. Downlighters pool light on the wall. Ones that do both are the most flexible. It changes the feel of a room far more than the style of the fitting does.'],
      ['Switched from where', 'Wall lights want their own switch, ideally by the door with the main light. Switched from the fitting itself means walking round the room turning them on individually.'],
      ['Solid wall or stud', 'Straightforward to run cable in a stud wall. A solid wall means chasing and making good, which is quick during a refurbishment and a much bigger job in a finished room.'],
      ['Symmetry', 'Wall lights are usually fitted in pairs and any difference in height or spacing between them is instantly visible on a flat wall. Worth setting out carefully.']
    ],
    process: [
      ['Agree the positions', 'Marked on the wall and looked at from where you sit, not from where the ladder is. Pairs measured off a common datum so they match.'],
      ['Work out the cable route', 'From the existing lighting circuit, through the stud or chased into the wall, kept in the safe zones so a future picture hook does not find it.'],
      ['Fit and switch', 'Back boxes set flush, fittings mounted level, and switching arranged so the wall lights work independently of the main light.'],
      ['Make good and test', 'Chases filled, the circuit tested and certificated, and the room left clean.']
    ],
    faqs: [
      ['How high should wall lights be fitted?', 'Around 1.5 to 1.7m from the floor is the normal range in a living room, and a little lower either side of a bed where they are being used for reading. The test is whether you can see into the lamp from a seated position; if you can, they are too low.'],
      ['Can you add wall lights to a finished room?', 'Yes, though on a solid wall it means chasing the plaster and making good afterwards, so there is decorating to follow. On a stud wall it is far less disruptive. Either way it is much easier while a room is being redecorated.'],
      ['Do wall lights need their own switch?', 'They do not have to, but a room with everything on one switch only has one setting. Putting them on a separate switch, ideally by the door, is what makes them useful in the evening rather than just decorative.'],
      ['Can you fit a picture light?', 'Yes. The choice is between a discreet fixed supply behind the picture, which looks best and needs deciding before decorating, and a surface fitting, which can go in at any point. Worth talking through before the wall is painted.']
    ]
  },
  {
    slug: 'bathroom-lighting',
    nav: 'Bathroom lighting',
    h1: 'Bathroom lighting',
    title: 'Bathroom Lighting Installation',
    icon: 'shield',
    blurb: 'Zone-rated lighting, mirrors and extraction, wired to the regulations.',
    bg: 'g7.jpg',
    photo: ['g7.jpg', 'A bathroom with an illuminated LED mirror, brass wall light and an electric shower in a tiled recess'],
    answer: 'Bathroom lighting is the one area where the rules decide what you can buy. BS 7671 divides a bathroom into zones by distance from the bath and shower, and a fitting has to carry an IP rating suitable for the zone it sits in: broadly IP65 inside the shower, IP44 within a couple of metres of it, and ordinary fittings only well away from both. Everything in a bathroom also needs RCD protection. The practical result is that a fitting you like from a general lighting range often cannot go where you want it.',
    intro: 'Bathrooms are small, wet, and the one room where lighting is genuinely a safety matter rather than a matter of taste. The good news is that the constraint mostly affects position: there is usually a way to get the look you want, it is just not always directly above the bath.',
    checkTitle: 'What the regulations decide for you',
    checks: [
      ['IP rating against the zone', 'The number that decides whether a fitting can legally go where you want it. Directly over a bath or in a shower needs a much higher rating than a fitting on the far wall. Tell us where you want it and we will find something rated for that position.'],
      ['Illuminated mirrors', 'Almost all need a permanent supply and a fused connection behind them, not a plug. Many also have demisters and shaver sockets, which change what the circuit needs. Best decided before tiling, because the supply has to come out in exactly the right place.'],
      ['Extraction', 'Often the same job. Whether the fan runs with the light, on a timer, or on humidity affects the wiring, and a fan in a bathroom without an opening window is a building regulations requirement rather than a preference.'],
      ['Colour temperature', 'Around 3000K suits a bathroom: crisp enough to see properly, not clinical. Very cold light is unflattering in the one room where people look closely at themselves.'],
      ['Dimming', 'Possible, and pleasant, but the fittings have to be dimmable and correctly rated for their zone. Worth deciding early because it affects the switch position and the wiring.']
    ],
    process: [
      ['Work out the zones', 'Measured from the bath and shower, so what can go where is settled before anything is bought or tiled.'],
      ['Plan the supplies', 'Mirror, fan and lighting supplies positioned to come out where they need to, which on a tiled wall is a one-chance decision.'],
      ['First fix before tiling', 'Cable run and boxes set while the walls are open. Anything missed here means lifting tiles later.'],
      ['Fit, test and certificate', 'Fittings installed, RCD protection confirmed, the circuit tested and a certificate issued.']
    ],
    faqs: [
      ['What IP rating do I need for a bathroom light?', 'It depends where it is going. Inside the shower or directly over the bath needs a high rating, typically IP65. Within about two metres of them, IP44 is the usual minimum. Away from both, an ordinary fitting is generally acceptable. The zones are defined in BS 7671 and measured from the bath and shower, so the answer comes from the position, not the room.'],
      ['Can I have downlights over the bath?', 'Yes, provided they are rated for the zone the bath sits in and the circuit has RCD protection. It is a common and perfectly safe arrangement when the right fittings are used.'],
      ['Do I need a special light for a shower?', 'A fitting inside the shower enclosure needs to be rated for it, which usually means IP65. It is not somewhere to fit something from a general lighting range and hope.'],
      ['Can you fit an illuminated mirror?', 'Yes. Most need a permanent supply and a fused connection behind them rather than a plug, so the supply has to come out in the right place. If the bathroom is being tiled, that is a decision to make before the tiler starts rather than after.'],
      ['Does a bathroom fan have to be wired to the light?', 'Not necessarily. It can run with the light and overrun on a timer, or run on humidity independently. Which suits depends on the room and how it is used, and it changes the wiring, so it is worth settling early.']
    ]
  },
  {
    slug: 'outdoor-lighting',
    nav: 'Outdoor lighting',
    h1: 'Outdoor and garden lighting',
    title: 'Outdoor and Garden Lighting',
    icon: 'sun',
    blurb: 'Garden, patio and security lighting specified for being outside.',
    bg: 'g4.jpg',
    photo: ['g23.jpg', 'A brick house lit at night by exterior downlights washing the walls and lighting the path around it'],
    answer: 'Outdoor lighting has to survive water, cold and being strimmed, none of which apply indoors. That means an IP rating chosen for where the fitting actually sits, RCD protection on the circuit, and cable that is either armoured and buried at a proper depth or run in suitable containment. The design question is simpler than people expect: light the things you want to see, not the whole garden. Aiming light down onto planting, steps and paths gives a far better result than flooding the lawn, and does not annoy the neighbours.',
    intro: 'Most gardens are lit by one very bright floodlight that makes everything outside its beam look darker. A few low-level fittings, aimed at something, transform a garden in a way a floodlight never does.',
    checkTitle: 'What outdoor fittings have to cope with',
    checks: [
      ['IP rating for the position', 'Not just "outdoor". A fitting on a sheltered wall and one sitting in a border collecting water need different ratings. Spike lights in planting have the hardest life of any fitting we install.'],
      ['Mains or low voltage', 'Low-voltage garden systems run from a transformer and are easier to extend later. Mains fittings are brighter and more permanent. Both need doing properly; the difference is mostly in how the cable is run.'],
      ['Where the cable can realistically go', 'Distance matters far more outdoors than indoors, and a run to the bottom of a garden needs planning around what you dig through. Straight runs along known lines are easier to avoid later than something that wanders across a lawn.'],
      ['Security lighting versus garden lighting', 'Two different jobs. A PIR floodlight over a side gate is security. Lighting a patio for sitting out is not, and one does not do the other well.'],
      ['Where the light will land', 'Fittings that throw light upward or across a boundary cause more complaints than any other outdoor job. Aiming down is almost always the better result as well as the more neighbourly one.']
    ],
    process: [
      ['Walk the garden', 'In the dark if we can, because what a garden needs at night is rarely what it looks like it needs in daylight.'],
      ['Plan the route and the load', 'What it feeds and how far it has to travel decide the cable size and the protection.'],
      ['Install the supply', 'Armoured cable buried at a proper depth with marker tape above it, or run in suitable containment where burying is not possible.'],
      ['Fit and aim', 'Fittings positioned and aimed at planting, steps and paths, with switching and timers set up so the garden is not all on one switch.'],
      ['Test and certificate', 'The circuit tested including RCD operation, which is what protects anyone using a socket or a mower outside.']
    ],
    faqs: [
      ['Do outdoor lights need RCD protection?', 'Yes. Anything outdoors, and any socket likely to be used outdoors, needs RCD protection. It is one of the clearest safety requirements there is, and it is what protects somebody using a mower or a hedge trimmer.'],
      ['Can you run power to the bottom of the garden?', 'Yes, with armoured cable buried at a proper depth and marker tape laid above it so anybody digging later finds the warning before the cable. The distance affects the cable size, so a long run is worth planning rather than guessing.'],
      ['Will garden lighting annoy my neighbours?', 'Only if it is aimed badly. Light thrown upward or across a boundary is the single most common cause of complaints. Aiming down onto planting, paths and steps looks better and does not light up next door.'],
      ['Is low-voltage garden lighting worth it?', 'For planting and path lighting, often yes: the cable is easier to run and extend, and it is simple to add to later. For security lighting or anything that needs to be bright, mains is usually the better answer.']
    ]
  },
  {
    slug: 'led-strip-lighting',
    nav: 'LED strip',
    h1: 'LED strip and feature lighting',
    title: 'LED Strip and Feature Lighting',
    icon: 'zap',
    blurb: 'Under-cabinet, coving and feature lighting, driven and hidden properly.',
    bg: 'g6.jpg',
    photo: ['g26.jpg', 'LED strip lighting fitted along the inside of a fitted wardrobe, hidden behind the front rail so the light shows and the diodes do not'],
    answer: 'LED strip is the fitting that most often disappoints, and almost always for the same two reasons: the strip is visible, or the driver was an afterthought. Strip should be hidden behind a lip, a coving edge or a channel so you see the light and not the diodes, and every run needs a driver of the right wattage sitting somewhere it can be reached when it eventually fails. Get those right and it is the cheapest way to make a room look considered.',
    intro: 'Strip lighting is used well when you cannot see where it is coming from. Under a run of wall units, behind a coving lip, along the underside of a floating shelf. Used badly it is a bright line of dots reflected in a gloss worktop.',
    checkTitle: 'What makes strip lighting look good or cheap',
    checks: [
      ['Where the driver will live', 'Every run needs one, it is the part most likely to fail, and it has to be reachable without dismantling the kitchen. Deciding this at the end is how drivers end up sealed behind plasterboard.'],
      ['Density of the LEDs', 'A low-density strip gives a visible line of dots, especially in a diffuser or reflected in a gloss surface. Higher density costs more and is the difference between a line of light and a row of spots.'],
      ['A channel or diffuser', 'Aluminium channel does two things: it hides the strip and it takes heat away, which is what LED strip life actually depends on. Strip stuck straight to a warm surface with its own adhesive is the usual reason a run dies early.'],
      ['Colour temperature, matched to the room', 'Strip is often bought separately from the rest of the lighting and ends up a different white. In a kitchen with 3000K downlights, 3000K strip.'],
      ['How it is switched', 'Under-cabinet lighting is far more useful on its own switch than tied to the main light, and it makes a good low-level light on its own in the evening.']
    ],
    process: [
      ['Work out what it is lighting', 'A worktop, a wall, a shelf edge. That decides the position, the direction and how bright it needs to be.'],
      ['Plan the driver and the route', 'Driver positioned somewhere accessible, with the supply run to it before anything is boxed in or plastered.'],
      ['Fit the channel', 'Channel or diffuser fixed so the strip is hidden from normal sightlines and has something to lose heat into.'],
      ['Install, switch and test', 'Strip fitted, connected, switched as its own group, and the circuit tested.']
    ],
    faqs: [
      ['Why has my LED strip gone dim in patches?', 'Usually heat or voltage drop. Strip stuck to a surface with no channel to take heat away degrades unevenly, and a long run fed from one end gets dimmer towards the far end. Both are avoidable at installation and awkward to fix afterwards.'],
      ['Can LED strip be dimmed?', 'Yes, but it is dimmed at the driver rather than with a normal wall dimmer, so the driver has to be a dimmable one and matched to a compatible control. Worth deciding before it is installed, because changing it later means getting back to the driver.'],
      ['Where does the driver go?', 'Somewhere it can be reached. Inside a wall unit, in an accessible void, or in a cupboard. It is the component most likely to need replacing, and sealing one behind plasterboard turns a ten-minute job into a repair.'],
      ['Can you fit strip lighting into coving?', 'Yes, and it is one of the best uses of it, provided there is a lip deep enough to hide the strip and enough gap above for the light to wash the ceiling. If the coving is already up it is worth checking the profile before ordering anything.']
    ]
  }
];

module.exports = { guides };
