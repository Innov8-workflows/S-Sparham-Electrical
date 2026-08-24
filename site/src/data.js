/* ============================================================
   S. Sparham Electrical - site data
   Single source of truth for the generator.

   ANYTHING THE CLIENT HAS NOT CONFIRMED LIVES IN `pending` BELOW AND
   RENDERS AS A VISIBLE PLACEHOLDER. Never move a value out of `pending`
   until Stephen has actually confirmed it. Insurance, guarantees, scheme
   registration, prices and hours are all business claims and must not be
   invented.

   Two hard rules for this site specifically:

   1. NO COMPETENT-PERSON SCHEME. The onboarding form names six
      qualifications but no NICEIC / NAPIT / ELECSA / Stroma membership.
      Nothing here may state or imply that the business is registered with
      one. `scheme` stays null until Stephen says otherwise.
   2. NO PRICES. None were supplied.

   Sources: onboarding form (website-onboarding-submission-LD6og0O.pdf,
   7 pages), the Aug-2026 audit of the old sitelift.site site, and the
   review harvest of 2026-08-21.
   ============================================================ */

/* Change SITE_URL the moment the domain goes live, then rebuild.
   Canonicals, OG tags, sitemap, robots, llms.txt and schema all derive
   from it, so this is the only place the host is written down. */
const SITE_URL = 'https://ssparhamelectrical.co.uk';

const biz = {
  name: 'S. Sparham Electrical',
  shortName: 'S. Sparham Electrical',
  legalName: 'S. Sparham Electrical',
  tagline: 'Your local electrical experts',
  phone: '07557 448945',
  phoneRaw: '07557448945',
  phoneIntl: '+447557448945',
  whatsapp: '447557448945',
  email: 'stephen_sparham@hotmail.co.uk',
  facebook: 'https://www.facebook.com/profile.php?id=100063680856858',
  /* the Page's own reviews tab, which is where a customer can WRITE one.
     biz.facebook lands on the timeline, where they cannot. */
  facebookReviews: 'https://www.facebook.com/profile.php?id=100063680856858&sk=reviews',
  instagram: 'https://www.instagram.com/s.sparham_electrical',
  mybuilder: 'https://www.mybuilder.com/profile/s-sparham-electrical',
  /* Two different Google links, and they are not interchangeable:
     googleProfile lands on the listing where a customer READS the reviews,
     googleReview opens the WRITE-a-review dialog.

     googleReview is the link off the "Ask for reviews" button in Stephen's
     own Google Business Profile, supplied 2026-08-23. It replaced one ending
     EBM, which resolved to the identical place and dialog (same CID,
     0x4841825bdf82c768) by a different entry point - the difference is only
     Google's own laa= attribution parameter, merchant-review-solicitation
     rather than nmx-review-solicitation-ia2. Not a broken link that was
     fixed; the merchant one is simply the horse's mouth. */
  googleProfile: 'https://g.page/r/CWjHgt9bgkFIEBM',
  googleReview: 'https://g.page/r/CWjHgt9bgkFIEAE/review',

  /* Confirmed on the onboarding form. Every value here is a business claim
     that appears publicly, so it may only change on Stephen's say-so. */
  owner: 'Stephen Sparham',
  ownerShort: 'Steve',
  teamSize: 3,
  yearsTrading: 5,
  insured: true,
  publicLiability: 1000000,
  publicLiabilityText: '£1 million',
  guaranteed: true,
  guaranteeMonths: 12,
  guaranteeText: '12-month guarantee',

  /* Town and postcode district only. The form gave a full street address
     which is almost certainly Stephen's home; see pending.address. */
  town: 'Ripley',
  county: 'Derbyshire',
  postcodeArea: 'DE5',
  region: 'Derbyshire and Nottinghamshire',
  baseArea: 'Derbyshire and Nottinghamshire',

  /* No competent-person scheme has been confirmed. Do not populate. */
  scheme: null,
  openingHours: null,

  /* ---- lead capture ----
     trackingId  : innov8 CRM site tracking (page views, call and WhatsApp taps
                   -> the site-metrics tiles on the Client Dash).
     leadEndpoint: the Apps Script web app that fans an enquiry out to the
                   client's Sheet, an email alert, and the CRM as a real lead.

     leadEndpoint is null until the script is deployed, and generate.js emits
     NO beacon while it is null. A beacon pointing at a dead URL fails silently,
     which is the one failure mode worth designing out: it looks exactly like a
     working site right up until you go looking for the leads. */
  trackingId: 'proj_0e50b9b530d3',
  leadEndpoint: 'https://script.google.com/macros/s/AKfycby_xIU5vBNAEPlx9xYUd9bE3cAGa68Ldk6hCiQ7VifxsuTAMzoQeHllmY16rLWaLqc/exec',

  /* ga4Id: Google Analytics 4, added 2026-08-24. Unlike trackingId and
     leadEndpoint this one DOES set cookies, so it is consent-gated - see the
     consent block in site.js and the Cookies section of the privacy policy,
     which had to be rewritten because it previously said the site set none.

     Null disables the whole thing cleanly: no banner, no gtag, no cookies. */
  ga4Id: 'G-7XZBCEYXTR',

  /* Google Search Console ownership, added 2026-08-24. Just proof that we
     control the domain - it sets nothing, sends nothing, and is not analytics,
     so it sits outside the consent gate.

     DO NOT REMOVE once Search Console says "verified". Google re-checks
     periodically and silently unverifies the property when the tag disappears,
     which takes the sitemap and the performance data with it. */
  googleVerification: 'HpoRHdcfTJOH5EXINNPOpAYdjGJYURZgFao-2liIBdE'
};

/* Everything here renders with a visible [Placeholder] chip so it cannot be
   mistaken for confirmed fact, and the build report reprints the list on
   every run. */
const pending = {
  scheme: 'COMPETENT-PERSON SCHEME. Is the business registered with NICEIC, ' +
          'NAPIT, ELECSA or Stroma? The form lists six qualifications but no ' +
          'scheme membership, and the site therefore never claims one. This is ' +
          'the first thing a homeowner is told to check before letting anyone ' +
          'near a consumer unit, and it also decides whether Part P notifiable ' +
          'work can be self-certified or has to go to building control.',
  address: 'STREET ADDRESS. The form gives 19 Honey Field Drive, Ripley DE5 ' +
           '3JL, which reads like a home address. LIKELY SETTLED: the Google ' +
           'Business Profile was checked on 2026-08-24 and is a service-area ' +
           'listing - "No location; deliveries and home services only" - so ' +
           'Google publishes no address either. The site showing "Ripley, ' +
           'Derbyshire DE5" only is consistent with that, and publishing his ' +
           'home address would not match the profile. Confirm and close.',
  /* WITHDRAWN 2026-08-24. This used to read "The Google Business Profile says
     the business is in BRINSLEY, while the form, MyBuilder and the old site
     all say RIPLEY", and it was simply not true. The profile was checked: it
     is a SERVICE-AREA business, "No location; deliveries and home services
     only", so it names no town at all and there was never a conflict.

     The claim traces to a misreading of the Aug-2026 audit, whose only
     mention of Brinsley is that the OLD sitelift site listed "twenty-six
     towns from Ripley and Codnor to Alfreton and Brinsley" as areas covered.
     Brinsley was one entry in a coverage list, not the business address.
     That audit also invented "53 reviews", so treat anything from it as a
     lead to check rather than a fact.

     What IS worth acting on is the coverage list, which is a real gap: */
  gbpAreas: 'GBP SERVICE AREAS vs AREA PAGES. The profile lists Derby, Codnor, ' +
            'Heanor, Swanwick, Nottingham, Ripley DE5, Belper DE56 and Alfreton ' +
            'DE55. HALF CLOSED. The site side is done: Codnor and Swanwick ' +
            'pages were written on 2026-08-24, so every town on the profile ' +
            'now has a page behind it. The profile side sits with Jay - ' +
            'Ilkeston, Matlock, Chesterfield and Eastwood have pages but are ' +
            'not listed as service areas on the GBP. Add those four and the ' +
            'two lists agree in both directions.',
  hours: 'OPENING HOURS. The old site advertised 07:00-19:00, seven days, and ' +
         'Google says "Opens 7am". Confirm before it goes into schema, because ' +
         'answer engines repeat it when somebody asks for an electrician open now.',
  email: 'BUSINESS EMAIL. The site currently shows stephen_sparham@hotmail.co.uk. ' +
         'Once the domain is live, info@ssparhamelectrical.co.uk reads as far ' +
         'more established and costs nothing.',
  photos: 'MORE PHOTOGRAPHS. A second batch of nineteen arrived on 2026-08-22 and ' +
          'is now on /our-work/, which covers off consumer units, testing, outdoor ' +
          'lighting, LED strip, three-phase and industrial work. Still unillustrated: ' +
          'CCTV, and chandeliers for the lighting guide. Thirty photographs in total, ' +
          'so pages no longer reuse the same handful.',
  beforeAfter: 'MORE BEFORE AND AFTER PAIRS. Two exist: the kitchen (clip) and ' +
               'the outdoor wall lights (drag-wipe). Both were shot handheld, and ' +
               'the second pair needed solving for scale and offset before it ' +
               'would wipe cleanly. A pair shot twice from the SAME spot, ideally ' +
               'marked on the floor, needs no such work. For rewires and consumer ' +
               'unit changes these sell the job better than a finished photo does.',
  prices: 'PRICE GUIDANCE. Nothing is published, so nothing is claimed. Even a ' +
          'rough call-out figure helps with AI answers and filters out enquiries ' +
          'that were never in budget.',
  logo: 'LOGO SOURCE FILE. The logo used here is keyed out of a black raster ' +
        'PNG. The workwear carries a lightning-bolt mark that the supplied logo ' +
        'file does not. Ask for the original vector or transparent PNG.',
  certificates: 'CERTIFICATE IMAGES. IMG_1079.png was attached to the form as ' +
                '"verification badge image / certificates" but never reached us. ' +
                'The credential strip under the hero is TEXT badges in the meantime. ' +
                'Send the certificates and they become real badge images.',
  lightingPhotos: 'LIGHTING GUIDE PHOTOGRAPHS. Outdoor lighting and LED strip were ' +
                  'filled from the second batch on 2026-08-23. CHANDELIERS is the only ' +
                  'guide left running on copy alone, and it says so on the page. One ' +
                  'photograph finishes the section.',
  projectDetails: 'PROJECT WRITE-UPS. Both case studies were drafted from the ' +
                  'photographs alone, so everything in them is visible in frame: ' +
                  'the kitchen from its clip, the outdoor lighting from the pair. ' +
                  'Location, how long either took, and anything about the customers ' +
                  'were deliberately left out rather than guessed. Two lines in the ' +
                  'outdoor scope list are trade practice rather than anything the ' +
                  'camera shows - the RCD-protected supply and the test certificate ' +
                  '- and they are there because the site already commits to both. ' +
                  'Give Stephen a read of both before treating either as signed off.'
};

/* ---------- CREDENTIALS ----------
   Straight off the onboarding form. These are the answer to the audit's
   single biggest finding: "Nothing here tells a customer you are a
   qualified electrician." Named in full on the homepage, About and every
   service page. NOT a scheme registration, and never presented as one. */
const credentials = [
  ['Level 3 NVQ Installing Electrotechnical Systems & Equipment',
   'The full installation qualification, assessed on site rather than in a classroom.'],
  ['Level 3 Award in Inspection and Testing (2391)',
   'The qualification behind an EICR and the test certificates issued at the end of a job.'],
  ['BS 7671 Wiring Regulations, 18th Edition',
   'The national standard every fixed electrical installation in the UK is designed and tested to.'],
  ['Level 3 Electric Vehicle Charging Equipment Installation',
   'The dedicated EV qualification, covering earthing arrangements and PEN fault detection.'],
  ['Completed electrical apprenticeship',
   'Trained the long way round, on the tools, rather than through a short course.'],
  ['HSE & Fire Safety in Buildings Awareness',
   'Site safety and fire safety in occupied buildings.']
];

/* ---------- CREDENTIAL BADGES ----------
   The short form of `credentials` above, for the strip under the hero, the
   service pages and the footer.

   These are TEXT badges, not logos, and that is deliberate: no competent-person
   scheme has been confirmed, so there is no NICEIC or NAPIT mark to show and
   inventing one would be a straightforward lie about a real business. If
   Stephen confirms a scheme, or sends the certificate images that were attached
   to the onboarding form and never arrived, these become real logos. */
const badges = [
  ['award', '18th Edition', 'BS 7671 Wiring Regulations'],
  ['file', '2391 Qualified', 'Inspection and testing'],
  ['zap', 'Level 3 NVQ', 'Electrotechnical systems'],
  ['car', 'EV Approved', 'Charge point installation'],
  ['shield', '£1m Insured', 'Public liability cover'],
  ['check', '12-Month Guarantee', 'On all work carried out']
];

/* ---------- PROJECTS ----------
   Before/after case studies, rendered as an alternating left-right zig-zag.
   The array order is the page order and the sides alternate automatically, so
   adding a second project needs nothing but another entry here.

   The write-up below was drafted FROM THE PHOTOGRAPHS: the steel over the
   knock-through, the props, the first-fix cable, and the finished pendants and
   downlights are all visibly in frame. Nothing that cannot be seen has been
   invented, which is why there is no location, no duration and no price on it.
   See pending.projectDetails. */
const projects = [
  {
    slug: 'kitchen-knock-through',
    eyebrow: 'Project 01',
    title: 'Kitchen knock-through and rewire',

    /* The client's own transition clip: the same camera position dissolving
       from stripped-back to finished. It REPLACES the drag-wipe on this
       project, because it shows the whole change without the visitor having
       to work out that the picture is draggable.

       projectRow still renders the wipe for any project that has before and
       after stills but no video, which is what the next pair will arrive as.
       Both stay in the data here: the stills are the video's poster and its
       fallback. */
    video: ['ba-1.mp4', 'ba-1-poster.jpg',
      'The kitchen dissolving from stripped back to brick, with the props and the steel beam in, through to the finished room with pendant lighting over the island'],

    before: ['ba-before.jpg', 'The kitchen stripped back to brick and block during the knock-through, with acrow props holding the ceiling, the new steel beam in place and first-fix cable dropped ready for the new layout'],
    after: ['ba-after.jpg', 'The finished open-plan kitchen, with three glass pendants over the breakfast bar, downlights set through the new ceiling and integrated ovens'],
    lead: 'Taking the wall out between the kitchen and the dining room turns an electrical job into a bigger one than most people expect. Once a steel goes in and the ceiling is opened up, the circuits that used to run through that wall have nowhere to go, so the whole area gets rewired rather than extended.',
    body: 'The useful part of a job like this is the timing. Everything about how the finished room is lit gets decided at the start of that clip, while the walls are open and the ceiling is down. Once the plasterer has been, a downlight moves by cutting a new hole, and a socket moves by chasing a finished wall. So the positions were set out against the kitchen drawing before any cable was run: pendant drops centred on the island, downlights worked around the joists and the new steel rather than in a grid, and switching arranged so the room can be lit for cooking or for sitting in.',
    scope: [
      'New circuits for the ovens, hob and extraction',
      'Kitchen and dining sockets rewired to the new layout',
      'Downlights set out around the new steel and the joist runs',
      'Three pendants over the breakfast bar, separately switched',
      'Under-cabinet lighting to the run of base units',
      'Tested, certificated and the board relabelled on completion'
    ]
  },
  {
    slug: 'outdoor-wall-lighting',
    eyebrow: 'Project 02',

    /* NO video on this one, deliberately. projectRow falls through to the
       drag-wipe when a project has stills and no clip, and this is the pair
       that path was written for: one camera position, one thing changed.
       A dissolve would be the weaker treatment here - the whole point is
       being able to hold the handle half way and see the same wall lit and
       unlit at once, which a clip cannot do.

       The two shots were NOT taken from the same spot; the crops in
       make-photos.sh are what makes them line up. See the note there before
       touching either file. */
    title: 'Outdoor lighting to the back of a house',
    /* Corner tags. NOT the default Before/After here only because the shots
       are day and dusk, which is the honest reason the two look so different
       and worth saying rather than letting somebody wonder. */
    labels: ['Before, daytime', 'After, dusk'],
    before: ['ba2-before.jpg', 'The back of the house before the work, in daylight, with bare brickwork above the patio doors and no exterior lighting fitted'],
    after: ['ba2-after.jpg', 'The same elevation at dusk, with three up-and-down wall lights throwing light up the brickwork and down over the patio below'],
    lead: 'The back of a house is usually the part that gets used after dark and the part with no light on it at all. Three fittings changed that here, and the photographs are the same wall, one in daylight and one at dusk.',
    body: 'Most outdoor lighting goes wrong by being too much of it in one place: a single floodlight over the door that makes everything outside its beam look darker than before. The approach here was the opposite. Three up-and-down wall lights were set across the elevation at a matching height, so each one washes the brickwork above and drops light onto the patio below, and the three together cover the whole back of the house evenly. Nothing is aimed out into the garden or over the boundary, which is what causes the light to land in a neighbour’s bedroom and the complaint that follows.',
    scope: [
      'Three up-and-down wall lights across the rear elevation',
      'Set at a matching height and spaced to light the whole wall evenly',
      'Aimed to wash the brickwork and the patio rather than the garden',
      'Outdoor-rated fittings on an RCD-protected supply',
      'Tested and certificated on completion'
    ]
  }
];

/* ---------- REVIEWS ----------
   Harvested 2026-08-21. Word for word as the customer wrote them, with
   nothing added and nothing improved. Only reviews whose full text could
   be read are here; three Google reviews that the "More" control would not
   expand are deliberately left out rather than quoted half-finished.

   `ratings` is what the site displays and what feeds aggregateRating.
   Google is the primary source because it is the largest and the one a
   customer can verify in one click. Platforms are NEVER blended into a
   single averaged score. */
const ratings = {
  google: { score: 4.9, count: 13, url: 'https://g.page/r/CWjHgt9bgkFIEBM/review' },
  mybuilder: { score: 5, count: 4, url: 'https://www.mybuilder.com/profile/s-sparham-electrical' },
  facebook: { recommendPct: 100, count: 5, url: 'https://www.facebook.com/profile.php?id=100063680856858&sk=reviews' },
  asAt: '21 August 2026'
};

const reviews = [
  {
    name: 'Jack Henley', source: 'Google', stars: 5, when: 'August 2026',
    job: 'Lighting installation',
    text: 'We’ve had spotlights, cabinet lights and pendants put all downstairs and they’re perfect, the spotlights were recommended by Sparham Electrical, they weren’t overpriced and he got exactly what we wanted. Couldn’t praise enough.'
  },
  {
    name: 'Tomb World', source: 'Google', stars: 5, when: 'August 2026',
    job: 'Fault finding',
    text: 'Top quality electrician, friendly and professional. Thanks so much for sorting out the unknown wiring in our loft and making sure everything was safe and up to standard.'
  },
  {
    name: 'Edward', source: 'MyBuilder', stars: 5, when: 'September 2025',
    place: 'Ashbourne', job: 'Rewire and run power across room',
    text: 'Job was done in a timely manner, very courteous and professional. Job was done to a very high standard. Even offered a bit extra on top just for Quality of Life, which shows a standard not set by others. Very highly recommended. Thank you for the work done.'
  },
  {
    name: 'Charl Sibley', source: 'Google', stars: 5, when: 'August 2026',
    job: 'Repeat customer',
    text: 'We have used Steve several times, he is professional, knowledgable and always does a great job. Would highly recommend!'
  },
  {
    name: 'Ryan Pears', source: 'MyBuilder', stars: 5, when: 'July 2025',
    place: 'Sutton in Ashfield', job: 'Check fuse box, install 2 new lights',
    text: 'Steve kept me informed of arrival time, got the job done in a professional, tidy manner, very friendly, highly recommended, will definitely use again!'
  },
  {
    name: 'Chris Parkes', source: 'Google', stars: 5, when: 'March 2026',
    job: 'Repair in a rental property',
    text: 'Another super quick service from S.Sparham Electrical. Oven element needed in a rental property and Stephen managed to fit my tenants in quickly, oven now up & running. Thank you'
  },
  {
    name: 'Coral Lily Archer', source: 'Facebook', stars: 5, when: 'April 2026',
    job: 'Various jobs',
    text: 'Steve has completed various jobs for myself, friends and family. Pricing is competitive and the work is always carried out to a high standard! I would highly recommend S.Sparham Electrical for any work you need doing around Derbyshire/Nottinghamshire'
  },
  {
    name: 'Ian Earley', source: 'Google', stars: 5, when: 'August 2026',
    job: 'Repeat customer',
    text: 'Used Steve for all of my electrical work in recent years and always pleased with the tidiness and competence of his work.'
  },
  {
    name: 'Joe Grace', source: 'Google', stars: 5, when: 'August 2026',
    job: 'Repeat customer',
    text: 'Highly recommend Steve, used him a couple of times already and will use again for anything electrical he’s knowledgable about all aspects, clean and reliable'
  },
  {
    name: 'Claire Deakin', source: 'Google', stars: 5, when: 'July 2026',
    job: 'Domestic electrical work',
    text: 'Stephen was friendly and professional whilst working for us. His communication is great, with quick responses to messages.'
  },
  {
    name: 'A customer in Nottingham', source: 'MyBuilder', stars: 5, when: 'June 2025',
    job: 'Rear extension rewire',
    text: 'Excellent job completed in less than a full day. When I explained what the problem was, after checking he decided to do a partial rewire. Very trustworthy, had to leave him full access of the house while I took my wife to a pre-booked hairdressing appointment; just got back as he was locking up. Everything working, delighted.'
  }
];

/* ---------- SERVICES ----------
   answer  : the answer-first opening paragraph (AEO/GEO). Must stand alone,
             because an answer engine will lift it out of the page on its own.
   title   : descriptive name, also used as schema Service.name
   metaTitle : optional short form for the <title> tag, set only where
             `title` plus " | S. Sparham Electrical" would run past the
             ~65 characters Google shows before truncating
   signs   : symptoms phrased the way a customer actually searches
   process : what the job involves, step by step
   faqs    : question-shaped, feeds FAQPage schema

   All technical content is general UK electrical practice under BS 7671 and
   Part P, NOT a claim about this business. Nothing here asserts a price, a
   scheme registration or a response time. */
const services = [
  {
    slug: 'consumer-unit-upgrades',
    nav: 'Consumer unit upgrades',
    h1: 'Consumer unit and fuse board upgrades',
    title: 'Consumer Unit and Fuse Board Upgrades',
    icon: 'zap',
    blurb: 'Old fuse boards swapped for a modern RCD-protected consumer unit, tested and certificated.',
    answer: 'A consumer unit upgrade replaces the old fuse board with a modern metal-clad unit fitted with RCD or RCBO protection, so a fault or a cut cable trips the supply in milliseconds instead of relying on a rewireable fuse. It is the single biggest safety improvement most older houses can make. Since 2016 consumer units in domestic premises have had to be in a non-combustible enclosure, which is why the new one is steel rather than plastic. The changeover itself is usually a day, and every existing circuit is tested before the certificate is issued.',
    intro: 'If your fuse board still has rewireable fuse carriers with fuse wire in them, or a row of plastic switches and no test button anywhere, it predates the protection modern regulations expect. It will still carry the load. What it will not do is disconnect fast enough to protect somebody who puts a nail through a cable or picks up a faulty appliance.',
    signsTitle: 'Signs your fuse board needs replacing',
    signs: [
      'Rewireable fuses with fuse wire rather than breakers that switch off',
      'A plastic consumer unit, particularly one under a wooden staircase',
      'No RCD, meaning no test button on the board at all',
      'Breakers that trip regularly, or one circuit that keeps taking the whole house out',
      'Signs of heat: browning, scorching or a smell of hot plastic around the board',
      'A board so full there is nowhere to add a circuit for a shower, hob or EV charger'
    ],
    process: [
      ['Look at what is there', 'The existing board, the incoming supply, the earthing and bonding, and the circuits themselves all get checked before anything is quoted. Whether an upgrade is straightforward or needs remedial work first depends on what is found here.'],
      ['Agree the board and the day', 'You are told which unit is going in and how the circuits will be split across it, so a fault on one circuit does not take the whole house out. The supply is off for most of the day, so it is planned around you.'],
      ['Isolate and change over', 'The supply is isolated, the old board comes off and the new unit goes on, with every circuit identified, terminated and labelled properly rather than guessed at.'],
      ['Test every circuit', 'Continuity, insulation resistance, earth fault loop impedance and RCD operating times are all measured and recorded. This is where an existing fault on an old circuit tends to show up.'],
      ['Certificate and hand over', 'You get an Electrical Installation Certificate with the test results on it, a labelled board, and a walk through of what each way does and how to test the RCD.']
    ],
    faqs: [
      ['How long does a consumer unit change take?', 'Most domestic changeovers are a single day. The power is off for the bulk of it, because every circuit has to be disconnected, re-terminated and then tested. If the testing finds a fault on an existing circuit, that has to be put right before the new board can be signed off, which can add time.'],
      ['Do I legally have to upgrade my fuse board?', 'No. There is no law forcing you to replace a working fuse board in your own home. But replacing a consumer unit is notifiable work under Part P of the Building Regulations in England and Wales, so once you do it, it has to be either carried out by someone registered with a competent person scheme or notified to your local building control beforehand.'],
      ['Why is the new consumer unit made of metal?', 'Since January 2016 consumer units in domestic premises have had to be in a non-combustible enclosure, after a run of fires that started inside plastic boards where a loose connection had been overheating. A steel enclosure contains it instead of feeding it.'],
      ['What is the difference between RCD and RCBO?', 'An RCD protects a group of circuits at once, so a fault on any one of them takes the whole group off. RCBOs give each circuit its own protection, so a fault in the garden lighting leaves the freezer and the upstairs sockets running. RCBOs cost more and are generally worth it.'],
      ['Will my old wiring pass on a new board?', 'Not always, and it is better to know. Old rubber or fabric insulated cable, lighting circuits with no earth, or damp getting into an outbuilding circuit will all show up in the testing. A new board makes those faults trip rather than hiding them, which is exactly the point, but it does mean some houses need remedial work first.']
    ]
  },
  {
    slug: 'rewires',
    nav: 'Rewires',
    h1: 'Full and partial house rewires',
    title: 'Full and Partial House Rewires',
    icon: 'home',
    blurb: 'Complete and partial rewires, from first fix through to test, certificate and making good.',
    answer: 'A rewire replaces the fixed cabling in a property, along with the sockets, switches, light fittings and consumer unit fed from it. A full rewire covers the whole house; a partial rewire covers only the circuits that need it, which is often the upstairs lighting or the ground floor sockets rather than everything. Most houses need it once, somewhere between fifty and seventy years after the original installation, and the work runs in two stages: first fix while the walls are open, then second fix once the plastering is done.',
    intro: 'Nobody rewires a house for fun. It is disruptive, it means chased walls and lifted floorboards, and it usually happens either because the existing wiring has reached the end of its life or because the house is being renovated anyway and it would be daft not to. The question worth asking first is whether you actually need a full rewire or whether a couple of circuits would do.',
    signsTitle: 'Signs a property needs rewiring',
    signs: [
      'Rubber, fabric or lead-sheathed cable, which points to an installation from the 1960s or earlier',
      'Round-pin sockets, or sockets mounted on skirting boards',
      'Old red and black cable in the fixed wiring, which predates the 2004 to 2006 colour change',
      'Lighting circuits with no earth wire at the switch or the rose',
      'Not enough sockets, so extension leads are permanently in use',
      'Recurring nuisance tripping that testing traces to deteriorated insulation'
    ],
    process: [
      ['Survey and honest advice', 'The existing installation is inspected and tested before anything is quoted, because plenty of houses assumed to need a full rewire turn out to need two circuits doing. You get told which it is.'],
      ['Plan the circuits and the positions', 'Where the sockets, switches, lights and any new circuits go is agreed with you first, on the basis of how you actually use the rooms. Moving a socket on paper is free; moving it once it is chased in is not.'],
      ['First fix', 'Walls are chased, floors lifted where needed, and new cable run back to the board with the correct capacity, protection and routing. Cables run in the safe zones so a future picture hook does not find one.'],
      ['Second fix', 'Once plastering and decorating are done, the accessories go on: sockets, switches, light fittings, the consumer unit, everything terminated and set level.'],
      ['Test, certify and make good', 'The whole installation is tested and an Electrical Installation Certificate issued with the results. Chases are made good and the property left clean rather than full of dust and offcuts.']
    ],
    faqs: [
      ['How long does a full rewire take?', 'On a typical three-bedroom house allow around five to ten days on site, split between first fix and second fix with the plastering in between. It depends heavily on access: a house with solid floors and no loft space takes longer than one with suspended timber floors and a clear roof void.'],
      ['Do I have to move out during a rewire?', 'Not usually, but it is easier if you can, particularly on a full rewire where every room gets disturbed at some point. If you are staying put, the work can be phased so you keep power and heating overnight. Say so up front and it gets planned that way.'],
      ['Is a partial rewire a false economy?', 'Not necessarily. If the ground floor was redone ten years ago and the upstairs lighting is still on old cable with no earth, rewiring the part that needs it is sensible. It stops being sensible when the whole installation is the same age and you end up back for the rest within a couple of years.'],
      ['How much mess does a rewire make?', 'A fair amount, honestly. Chasing walls makes dust and lifting floors disturbs carpets. What separates a good job from a bad one is how carefully things are lifted and put back, and whether the property is cleaned down at the end of each day rather than at the end of the job.'],
      ['Do I get a certificate when it is finished?', 'Yes. A rewire ends with an Electrical Installation Certificate showing the test results for every circuit. Keep it. You will be asked for it when you sell the house, and a landlord or a mortgage lender may ask sooner.'],
      ['Does a rewire need building control approval?', 'In England and Wales a rewire is notifiable work under Part P, so it must either be done by an electrician registered with a competent person scheme who can self-certify it, or notified to your local authority building control before work starts.']
    ]
  },
  {
    slug: 'eicr-and-electrical-testing',
    nav: 'EICRs and testing',
    h1: 'EICRs and electrical testing',
    title: 'EICR Electrical Testing and Certificates',
    icon: 'shield',
    blurb: 'Landlord and homeowner EICRs, inspection, testing and certification.',
    answer: 'An EICR, or Electrical Installation Condition Report, is a formal inspection and test of a property’s fixed wiring that grades what it finds. C1 means danger is present and needs putting right immediately, C2 means potentially dangerous and needs remedial work, C3 is an improvement recommendation, and FI means something needs further investigation. Any C1 or C2 makes the report unsatisfactory. Private landlords in England must have a satisfactory EICR carried out at least every five years and give a copy to their tenants.',
    intro: 'An EICR is not a formality. It is the only way to find out what is actually going on inside an installation, because the faults that matter are rarely visible from the front of a socket. Testing measures the things you cannot see: whether the earth is doing its job, whether the insulation has broken down, and whether the protective devices actually disconnect in the time they are supposed to.',
    signsTitle: 'When you need an EICR',
    signs: [
      'You are a private landlord in England: at least every five years, and for each new tenancy',
      'You are buying a property, particularly one not rewired in decades',
      'You are selling, and the buyer’s solicitor has asked about the electrics',
      'The installation is over ten years old and has never been formally tested',
      'A change of use, an extension or a loft conversion has altered the installation',
      'Something has been happening that nobody has got to the bottom of'
    ],
    process: [
      ['Agree access and timing', 'Testing means the power is off in stages, so it is arranged around the property being empty, or around a tenant if it is occupied. Access is needed to the consumer unit, the meter and every accessory.'],
      ['Visual inspection', 'The whole installation is looked over first: the board, the earthing and bonding, accessories, and anything obviously damaged, overloaded or wrongly installed.'],
      ['Dead testing', 'With the supply isolated: continuity of protective conductors, ring circuit continuity, insulation resistance and polarity. This is where deteriorated cable and borrowed neutrals show up.'],
      ['Live testing', 'With the supply back on: earth fault loop impedance, prospective fault current and RCD disconnection times, measured rather than assumed.'],
      ['Report and explain it', 'You get the report with every observation coded, and a plain explanation of what each code actually means for you, which matters more than the paperwork. Anything coded C1 or C2 is talked through so you can decide what to do.']
    ],
    faqs: [
      ['How often does a rented property need an EICR?', 'In England, private rented properties need a satisfactory EICR at least every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, or sooner if the report itself specifies a shorter interval. A copy goes to the existing tenants and to any new tenant before they move in.'],
      ['What do C1, C2 and C3 actually mean?', 'C1 is danger present, so somebody is at risk right now and it is made safe before we leave. C2 is potentially dangerous, meaning it would become a danger under fault conditions. C3 is an improvement recommendation, which does not make a report unsatisfactory. FI means further investigation is needed. Any C1 or C2 makes the overall report unsatisfactory until it is put right.'],
      ['My EICR came back unsatisfactory. What now?', 'It means at least one C1 or C2 was found. The remedial work needs doing and then the report can be satisfied. It does not mean the whole installation is scrap, and it is worth understanding what was actually coded before agreeing to anything: a single unsatisfactory item is a repair, not a rewire.'],
      ['How long does an EICR take?', 'A typical three-bedroom house is a few hours. Larger properties, commercial premises, or installations with a lot of circuits and poor labelling take longer, because every circuit has to be identified and tested individually.'],
      ['Does the power have to be off?', 'For part of it, yes. The dead tests cannot be done with the installation live. It is not off continuously, but you should expect interruptions through the visit and plan around anything that cannot lose power.'],
      ['Is an EICR the same as a PAT test?', 'No. An EICR covers the fixed wiring in the building: the circuits, the board and the accessories. PAT testing covers plug-in appliances. They are separate things and a landlord may need both.']
    ]
  },
  {
    slug: 'fault-finding-and-repairs',
    nav: 'Fault finding and repairs',
    h1: 'Fault finding and electrical repairs',
    title: 'Electrical Fault Finding and Repairs',
    icon: 'triangle',
    blurb: 'Tripping breakers, dead circuits and intermittent faults traced to the actual cause.',
    answer: 'Electrical fault finding means tracing a problem back to its cause rather than treating the symptom. A breaker that trips, a circuit that is dead or a light that flickers is the end of the story, not the start of it, and the fault is usually somewhere else entirely: a nail through a cable under a floor, water in an outside socket, a failing appliance, or a loose connection that has been slowly heating up for months. Testing narrows it down circuit by circuit until the actual point of failure is found.',
    intro: 'The temptation with a tripping breaker is to keep switching it back on. That works right up until it does not, and in the meantime the fault causing it is still there. Most faults fall into a small number of categories, and testing tells you which one you have rather than leaving you to guess.',
    signsTitle: 'Faults we get called out to most',
    signs: [
      'An RCD that trips, sometimes at the same time every day, sometimes at random',
      'One circuit dead while everything else works',
      'Lights flickering or dimming when an appliance kicks in',
      'Sockets that work intermittently, or stop working when something is plugged in',
      'A burning smell, or a socket or switch that is warm to the touch',
      'Outdoor sockets and garden lighting that fail after heavy rain'
    ],
    process: [
      ['Find out what actually happens', 'When it trips, what is running at the time, whether it is worse in wet weather. This narrows it down faster than any meter does, so the questions are not filler.'],
      ['Split the installation down', 'Circuits are isolated and tested in turn to find which one carries the fault, rather than replacing parts and hoping.'],
      ['Test to locate it', 'Insulation resistance and continuity testing locates a breakdown to a section of a circuit, so the floor comes up in one place instead of six.'],
      ['Repair it properly', 'The damaged section is repaired or replaced, connections remade, and the cause dealt with rather than covered up.'],
      ['Re-test and confirm', 'The circuit is tested again after the repair to prove it is actually fixed, and you are told what caused it so it does not come back.']
    ],
    faqs: [
      ['Why does my RCD keep tripping?', 'An RCD trips when it detects current leaking to earth. Common causes are a faulty appliance such as a kettle, an immersion heater or a washing machine, water in an outside socket or light, damaged cable, or accumulated small leakages across several circuits adding up to enough to trip. Unplugging everything on the affected circuit and switching back on is the quickest way to tell whether it is an appliance or the wiring.'],
      ['Can you find a fault without pulling the house apart?', 'Usually, yes. Testing locates a fault to a section of circuit rather than a whole house, so a floor might come up in one spot rather than everywhere. Some faults, particularly in buried cable, do mean opening something up, but only after the testing says where.'],
      ['Is a warm plug socket dangerous?', 'A socket that is warm to the touch, discoloured or smells of hot plastic should be stopped using and looked at. It usually means a loose connection arcing behind the faceplate, which generates heat and is a genuine fire risk. It does not fix itself.'],
      ['Why do my lights flicker when the shower comes on?', 'A brief dip when a large load starts is normal to a degree. Persistent flickering, or dimming that stays while the appliance runs, points to a loose connection, an undersized or shared circuit, or a problem on the incoming supply. It is worth testing rather than living with.'],
      ['What if the fault is in an appliance and not the wiring?', 'You get told that. Plenty of call-outs for tripping circuits end with a faulty appliance rather than a wiring fault, and there is no sense charging to rewire something that is working fine.']
    ]
  },
  {
    slug: 'lighting-and-led-installations',
    nav: 'Lighting and LED',
    h1: 'Lighting and LED installations',
    title: 'Lighting and LED Lighting Installation',
    icon: 'lightbulb',
    blurb: 'Downlights, pendants, under-cabinet and feature lighting, set out properly and wired to last.',
    answer: 'Lighting installation covers everything from swapping a single fitting to setting out a whole room: downlights, pendants, under-cabinet strips, wall lights and dimming. The part that decides whether it looks right is the setting out, done before a single hole is cut. Spacing, beam angle, colour temperature and how the circuit is switched matter more than the fittings themselves, and getting them wrong is why so many rooms end up with a grid of downlights that lights the floor and nothing else.',
    intro: 'Lighting is the job where the difference between an electrician who thinks about it and one who does not is most obvious, because you look at it every day. A room lit properly has layers: something bright for working, something softer for the evening, and light where you actually need it rather than a uniform wash from the middle of the ceiling.',
    signsTitle: 'Lighting work we are asked for',
    signs: [
      'Replacing dated halogen downlights with efficient LED, including fire-rated fittings',
      'Kitchen lighting: downlights, pendants over an island and under-cabinet strips',
      'Adding dimming, or fixing dimmers that buzz or flicker with LED lamps',
      'Feature and mood lighting, including LED strip in coving and behind panelling',
      'Bathroom lighting, mirrors and extractors, wired to the zone requirements',
      'Adding switching so a room is not stuck on one circuit and one switch'
    ],
    process: [
      ['Work out what the room is for', 'Where you stand, where you sit, what you do in there and which surfaces need lighting. This drives the layout, not the other way round.'],
      ['Set the positions out', 'Fittings are set out and marked before anything is cut, taking account of joists, pipework and how the ceiling actually runs. You see the layout before there are holes in it.'],
      ['Wire and switch it', 'Cable is run, circuits arranged so the lighting can be switched and dimmed in sensible groups, and any new switch positions put where you would reach for them.'],
      ['Fit and set up', 'Fittings go in level and square, with beam angles and colour temperature consistent across the room. Dimmers are matched to the lamps so they do not buzz or flicker.'],
      ['Test and tidy', 'The circuit is tested and certificated, and the room cleaned down. Ceiling dust from downlight cutting gets everywhere if nobody bothers, and it is not much fun to inherit.']
    ],
    faqs: [
      ['How many downlights does a room need?', 'Fewer than most people expect. It depends on ceiling height, beam angle and lamp output, but a regular grid of identical downlights usually over-lights the middle of the floor and under-lights the worktops and corners where you actually need it. It is worth setting out around the tasks in the room instead.'],
      ['Why do my LED lights flicker or buzz on a dimmer?', 'Almost always a compatibility problem. Older dimmers were designed for filament lamps and need a minimum load that LEDs never draw, which causes flicker, buzz or a refusal to switch off fully. A trailing-edge dimmer rated for LED, matched to the lamps, is normally the fix.'],
      ['What colour temperature should I choose?', 'Around 2700K is warm and suits living rooms and bedrooms. Around 3000K is a little crisper and is common in kitchens and bathrooms. 4000K and above reads cold in a home and is better kept for garages and workshops. The important thing is being consistent within a room, because mixing them is very noticeable.'],
      ['Can you put downlights in an upstairs ceiling?', 'Yes, and in a ceiling with a habitable room above, fire-rated fittings are used so the fire resistance of the ceiling is maintained where holes have been cut in it. In older properties it is also worth checking what the ceiling is made of before cutting.'],
      ['Do I need a special light in a bathroom?', 'Yes. BS 7671 divides a bathroom into zones based on distance from the bath and shower, and fittings need an IP rating appropriate to the zone they are in. Anything within the shower zone in particular has to be rated for it, and lighting in a bathroom needs RCD protection.']
    ]
  },
  {
    slug: 'ev-charger-installation',
    nav: 'EV charger installation',
    h1: 'EV charger installation',
    title: 'Electric Car Charger Installation',
    icon: 'car',
    blurb: 'Home and workplace EV chargers on a dedicated circuit, installed by a qualified installer.',
    answer: 'A home EV charger is a dedicated circuit run from the consumer unit to a wall-mounted charge point, typically 7kW on a single-phase domestic supply, which puts back roughly 25 to 30 miles of range an hour. It is not a socket on an existing circuit. BS 7671 Section 722 sets specific requirements for EV installations, particularly around the earthing arrangement, because most UK homes use a PME supply and an open PEN conductor fault could make the car body live. That is handled either by a charge point with built-in PEN fault detection or by a separate earth electrode.',
    intro: 'The charger itself is the easy part. What decides whether an installation is straightforward is everything behind it: whether the incoming supply and the main fuse can take the extra load, whether the consumer unit has a spare way, what the earthing arrangement is, and how far the cable has to travel to get from the board to where you park.',
    signsTitle: 'What gets checked before installation',
    signs: [
      'The main fuse rating and whether the supply can take the additional load',
      'Whether the consumer unit has a spare way and suitable protection',
      'The earthing arrangement, and how PEN fault protection will be provided',
      'The cable route from the board to the parking space, and its length',
      'Where the car actually parks, and which side its charging port is on',
      'Whether load curtailment is needed so the charger backs off under heavy household load'
    ],
    process: [
      ['Survey the supply', 'The incoming supply, main fuse, earthing arrangement and consumer unit are all checked before a charger is recommended, because they decide what can actually be installed.'],
      ['Agree the position', 'Charger position and cable route are agreed with you, taking account of where you park, which side the port is on, and how the cable will look on the wall rather than just where it is quickest to run.'],
      ['Install the circuit', 'A dedicated circuit is run from the board with the correct cable size and protection for the load and the route, including the RCD type an EV circuit requires.'],
      ['Mount, connect and configure', 'The unit is fitted, connected and set up, including the app or account side and any load management if the supply calls for it.'],
      ['Test, certify and show you', 'The circuit is tested and certificated, and you are shown how to use it, including scheduled charging on an off-peak tariff, which is where most of the running cost saving actually comes from.']
    ],
    faqs: [
      ['How long does an EV charger installation take?', 'Most straightforward domestic installations are half a day to a day. Longer cable runs, a consumer unit with no spare capacity, or an earthing arrangement that needs an electrode adding will push it out.'],
      ['Can I just charge from a normal socket instead?', 'A three-pin granny cable works but is slow, typically around 2.3kW, so a full charge takes most of a day or longer. It also puts a socket and its circuit under a continuous heavy load for hours at a time, which they were never really designed for. It is fine occasionally and a poor idea as the everyday method.'],
      ['Do I need a 7kW charger or a 22kW one?', 'On a standard single-phase domestic supply, 7kW is the practical maximum and it is plenty: overnight it fills almost any car from most starting points. 22kW needs a three-phase supply, which very few UK homes have and which is expensive to bring in.'],
      ['What is a PEN fault and why does it matter?', 'Most UK homes have a PME earthing arrangement where the earth comes from the supply neutral. If that combined conductor fails out in the street, exposed metalwork including a car body can rise to a dangerous voltage. BS 7671 therefore requires EV installations either to use a charge point with built-in PEN fault detection or to have a separate earth electrode installed.'],
      ['Can you install a charger I have already bought?', 'Usually yes, provided it meets current requirements and the supply suits it. It is worth asking before you buy, because some units expect a particular earthing arrangement or need an extra device to work safely on a PME supply.'],
      ['Do I need permission from anyone?', 'A domestic charge point installation is notifiable under Part P, so it is either self-certified by a registered installer or notified to building control. Your Distribution Network Operator also has to be told about the installation, which the installer normally handles.']
    ]
  },
  {
    slug: 'domestic-and-commercial-installations',
    nav: 'Installations',
    h1: 'Domestic and commercial electrical installations',
    title: 'Domestic and Commercial Electrical Installations',
    metaTitle: 'Electrical Installations',
    icon: 'plug',
    blurb: 'New circuits, sockets, switches and full installations for homes and business premises.',
    answer: 'Electrical installation work covers anything that adds to or alters the fixed wiring of a building: extra sockets, a new circuit for a cooker, hob, shower or garden supply, moving accessories during a refurbishment, or wiring a property from scratch. Every new circuit is designed for the load it will carry, protected appropriately, tested on completion and certificated, whether it is one socket in a home office or a full commercial fit-out.',
    intro: 'Most installation work starts because something has changed. A room is being used differently, an appliance has arrived that needs its own circuit, or a business has taken on premises wired for something else entirely. The job is to add what is needed without overloading what is already there, which is why the existing installation gets looked at first.',
    signsTitle: 'Installation work we take on',
    signs: [
      'Extra sockets, so extension leads and adaptors are not doing a permanent job',
      'Dedicated circuits for cookers, hobs, showers, hot tubs and garden supplies',
      'Home office and garden room wiring, including data and networking containment',
      'Kitchen and bathroom refurbishments, including appliance circuits and extraction',
      'Commercial fit-outs: shops, offices, salons, workshops and units',
      'Supplies to outbuildings, garages, workshops and summer houses'
    ],
    process: [
      ['Understand what it is for', 'What is going in, how much it draws and how it will be used decides the circuit, so the conversation starts there rather than with a cable size.'],
      ['Check what is already there', 'The board, the spare capacity and the condition of the existing installation are checked. There is no sense adding a circuit to a board that cannot take it.'],
      ['Agree positions and routes', 'Accessory positions and cable routes are agreed before work starts, with cables kept in the safe zones so they are not somewhere a future shelf bracket will find them.'],
      ['Install to standard', 'Circuits are installed to BS 7671, with the right cable size for the load and the route, correct protective devices, and containment where it belongs.'],
      ['Test, certify and label', 'Everything is tested, an Electrical Installation Certificate or Minor Works Certificate issued, and the board labelled so the next person can tell what is what.']
    ],
    faqs: [
      ['Can I add sockets to an existing circuit?', 'Often yes. A ring final circuit will usually take additional sockets, provided the circuit is in good condition, correctly protected and not already heavily loaded. It gets tested first, because extending a circuit that already has a fault on it just spreads the problem.'],
      ['Does adding a socket need building control approval?', 'In England and Wales, adding a socket to an existing circuit outside a special location is not normally notifiable. A new circuit is, and so is any work in a bathroom or shower room. Notifiable work is either self-certified by an electrician registered with a competent person scheme or notified to building control first.'],
      ['Do you do commercial as well as domestic work?', 'Yes. S. Sparham Electrical covers domestic, commercial and industrial work, from a shop or salon fit-out through to workshops and units. Commercial jobs are usually planned around opening hours so the trading day is not lost.'],
      ['Can you wire a garden room or outbuilding?', 'Yes. A supply to an outbuilding is a dedicated circuit with cable rated and installed for the route, whether that is buried armoured cable or a run through the building. It is tested and certificated in the same way as any other circuit.'],
      ['What certificate do I get for a small job?', 'An addition or alteration to an existing circuit gets a Minor Electrical Installation Works Certificate. A new circuit gets a full Electrical Installation Certificate. Both carry the test results and both are worth keeping.']
    ]
  },
  {
    slug: 'new-builds-and-renovations',
    nav: 'New builds and renovations',
    h1: 'New builds and renovations',
    title: 'New Build and Renovation Electrical Work',
    icon: 'hammer',
    blurb: 'First and second fix on new builds, extensions, conversions and full renovations.',
    answer: 'Electrical work on a new build or a renovation runs in two stages. First fix happens while the structure is open: cables run, back boxes set, containment in place and the supply position established, all before plastering. Second fix happens once the walls are finished: accessories, light fittings, the consumer unit, then testing and certification. Getting the first fix right matters most, because everything decided at that stage is buried by the time anyone notices it was wrong.',
    intro: 'On a renovation the electrician is rarely the only trade on site, and the jobs that run smoothly are the ones where the sequencing was agreed up front. Being ready to first fix at the right moment, and not holding up the plasterer, is most of it.',
    signsTitle: 'Projects we work on',
    signs: [
      'New build houses, from supply position through to final certification',
      'Extensions and knock-throughs, including altering existing circuits to suit',
      'Loft and garage conversions, including new circuits and smoke alarm systems',
      'Full house renovations where the property is being stripped back',
      'Kitchen and bathroom refits, working alongside the fitter and the plumber',
      'Barn conversions and older properties needing a complete new installation'
    ],
    process: [
      ['Plan it with the drawings', 'Circuits, accessory positions and load are planned from the layout before anything is run, so what goes in matches how the finished rooms will be used.'],
      ['First fix', 'Cables run, back boxes set at consistent heights, containment in place and the supply position sorted, all before the plasterer arrives.'],
      ['Coordinate with the other trades', 'Sequencing is agreed with the builder, plumber, plasterer and kitchen fitter so nobody is waiting on anybody and nothing has to come back out.'],
      ['Second fix', 'Accessories, light fittings and the consumer unit go on once decorating is far enough along not to damage them.'],
      ['Test, certify and hand over', 'The whole installation is tested and certificated, the board labelled, and everything demonstrated before handover.']
    ],
    faqs: [
      ['When should the electrician come in on a renovation?', 'Twice. First fix once the structure and stud work are up but before plastering, and second fix once decorating is far enough on to fit accessories without damaging them. Booking both slots early avoids the common problem of a plasterer standing waiting.'],
      ['Can you work alongside our builder?', 'Yes, and it is usually how these jobs run. Sequencing gets agreed with whoever is running the site so first and second fix land at the right point and no other trade is held up.'],
      ['Do extensions need their own consumer unit?', 'Not usually. An extension is normally fed from the existing board, provided it has spare capacity and is in good enough condition. If it is an old board with no RCD protection, it is often the sensible moment to change it while the walls are open.'],
      ['What about smoke alarms in a conversion?', 'A loft conversion changes the escape route and the alarm requirements that go with it, typically meaning interlinked mains-powered alarms with battery backup on each storey. It is a building control matter as well as an electrical one and is worth settling early.'],
      ['Can you quote from plans?', 'Yes, for the electrical work. A drawing showing room layouts and intended use is enough to plan circuits and price the job, and it is far better than pricing it after first fix has started.']
    ]
  },
  {
    slug: 'cctv-and-security-systems',
    nav: 'CCTV and security',
    h1: 'CCTV and security systems',
    title: 'CCTV and Security System Installation',
    icon: 'cctv',
    blurb: 'CCTV, security lighting and door entry installed and set up so it works when it is needed.',
    answer: 'A CCTV installation is only as good as its camera positions and its lighting. Cameras are sited to cover the actual approaches to a property, at a height that captures a recognisable face rather than the top of a head, recording to a local NVR or DVR with remote access from a phone. Most systems that disappoint do so for predictable reasons: cameras too high, pointed at a driveway with the sun behind them, or recording at a resolution and frame rate that turns anything moving into a smear.',
    intro: 'Cameras that produce footage nobody can identify anybody from are worse than no cameras, because they give the impression of cover that is not there. The useful questions are where somebody would actually approach from, what you want to be able to recognise, and what the lighting does at three in the morning.',
    signsTitle: 'Security work we install',
    signs: [
      'CCTV for homes and business premises, with remote viewing on a phone',
      'Camera positions planned for identification, not just for coverage',
      'Recording to a local NVR or DVR, wired rather than dependent on wifi',
      'Security and PIR lighting, including to sheds, side gates and dark approaches',
      'Video door entry and doorbell cameras, wired to a permanent supply',
      'Power and containment for alarm systems and networking'
    ],
    process: [
      ['Walk the site', 'The property is walked to work out how somebody would actually approach it, which is often not where people assume, and what the lighting does after dark.'],
      ['Plan the positions', 'Cameras are positioned for recognisable images: at a height and angle that captures faces and plates, not into direct sun or a floodlight.'],
      ['Cable it properly', 'Cameras are wired back to the recorder rather than left depending on wifi, with cable routed and clipped tidily instead of looped across a wall.'],
      ['Set it up and configure', 'The recorder, storage, motion zones and remote access on your phone are all set up and tested, including what happens at night.'],
      ['Show you how to use it', 'You get shown how to review footage and export a clip, because the day you need it is not the day to be working it out.']
    ],
    faqs: [
      ['How many cameras do I actually need?', 'Fewer, well positioned, beats more badly positioned. Most homes are covered by two to four: the main approach, the rear, and any side access or vulnerable outbuilding. It is worth walking the property before deciding rather than buying a boxed set of eight.'],
      ['Is wired CCTV better than wireless?', 'For a permanent installation, yes. Wired cameras get power and data down one run, do not drop off the network, and do not need batteries changing. Wireless has its place where cabling genuinely cannot be run, at the cost of reliability.'],
      ['Will CCTV work at night?', 'Cameras with infrared will produce a usable monochrome image in darkness, within range. Beyond that range you get nothing useful, which is why lighting and camera position matter as much as the camera specification. Existing security lighting can work for or against a camera depending on where it points.'],
      ['Do I have to tell people I have CCTV?', 'If your cameras capture anything beyond your own property boundary, such as a pavement or a neighbour’s garden, UK data protection law applies to you as the operator. In practice that means signage, keeping recordings no longer than needed, and being able to respond if somebody asks for footage of themselves. The ICO publishes plain guidance for domestic users.'],
      ['Can you add cameras to a system I already have?', 'Usually, if the recorder has spare channels and the cameras are compatible. Mixed systems can be awkward, so it is worth checking what you have before buying anything new.']
    ]
  },
  {
    slug: 'outdoor-electrical-and-lighting',
    nav: 'Outdoor electrical',
    h1: 'Outdoor electrical work and garden lighting',
    title: 'Outdoor Electrical Installations and Garden Lighting',
    metaTitle: 'Outdoor Electrics and Garden Lighting',
    icon: 'sun',
    blurb: 'Garden lighting, outdoor sockets, hot tub supplies and power to sheds and garages.',
    answer: 'Outdoor electrical work has to deal with water, temperature swings and physical damage, none of which apply indoors. That means IP-rated accessories chosen for their position, RCD protection on every socket and lighting circuit outside, and cable that is either armoured and buried at a proper depth or run in suitable containment. Almost every outdoor circuit that fails does so because one of those three things was skipped.',
    intro: 'Garden electrics get abused. They sit in the rain, they get strimmed, they get dug up, and they spend half the year cold and wet. Anything installed out there needs to be specified for that from the start, because an indoor-grade fitting with a bit of silicone round it lasts one winter.',
    signsTitle: 'Outdoor work we carry out',
    signs: [
      'Garden and patio lighting, including spike, wall and step lighting',
      'Outdoor sockets, weatherproof and RCD protected',
      'Hot tub supplies on a dedicated, correctly protected circuit',
      'Power and lighting to sheds, garages, workshops and summer houses',
      'Armoured cable runs, buried at depth and marked so they are not dug through later',
      'Security and PIR lighting to driveways, side gates and dark approaches'
    ],
    process: [
      ['Plan the route and the load', 'Where the cable can run, how far it has to go and what it will feed decide the cable size and the protection. Distance matters more outdoors than most people expect.'],
      ['Specify for outside', 'Accessories and fittings are chosen with an IP rating suitable for where they actually sit, not just for being outdoors in general.'],
      ['Install the supply', 'Armoured cable is buried at a proper depth with marker tape above it, or run in suitable containment where burying is not possible.'],
      ['Fit and aim the lighting', 'Fittings are positioned and aimed so the garden is lit rather than the neighbours, and switching and timers set up so it is not all on one switch.'],
      ['Test and certify', 'The circuit is tested and certificated, including RCD operation, which is what protects anybody using a socket outside.']
    ],
    faqs: [
      ['Can I run an extension lead to my shed permanently?', 'It is a bad idea. Extension leads are not rated for permanent outdoor use, the cable is not protected against damage, and there is usually no RCD protection at the far end. A proper armoured supply is not a big job and it removes the risk entirely.'],
      ['How deep does buried cable need to go?', 'Armoured cable in a garden should be deep enough to be clear of normal digging and cultivation, with marker tape laid above it so anybody who does dig finds the warning before the cable. Route it sensibly too: straight runs along known lines are easier to avoid than something that wanders across a lawn.'],
      ['Do outdoor sockets need RCD protection?', 'Yes. Any socket outlet likely to be used outdoors needs RCD protection, and it is one of the clearest safety requirements there is. Anyone using a mower, hedge trimmer or pressure washer is relying on it.'],
      ['Can you wire a hot tub?', 'Yes. A hot tub needs its own dedicated circuit with suitable RCD protection and an isolator positioned where it can be reached but not from inside the tub. Check the manufacturer’s load requirement before ordering, because some larger units need more supply than an older consumer unit has spare.'],
      ['Will garden lighting annoy my neighbours?', 'Only if it is aimed badly. Fittings that throw light upward or across a boundary cause more complaints than any other outdoor job. Aiming light down onto planting, paths and steps gives a better result and does not light up next door’s bedroom.']
    ]
  },
  {
    slug: 'industrial-electrical-work',
    nav: 'Industrial work',
    h1: 'Industrial electrical work',
    title: 'Industrial Electrical Installation and Maintenance',
    metaTitle: 'Industrial Electrical Work',
    icon: 'factory',
    blurb: 'Workshops, units and industrial premises: three-phase, machinery supplies and distribution.',
    answer: 'Industrial electrical work covers three-phase distribution, supplies to machinery, and the containment, isolation and control gear that go with them. The difference from domestic work is not just scale: loads are heavier and more continuous, isolation has to be arranged so a machine can be worked on safely, and downtime costs money, so work is planned around production rather than the other way round.',
    intro: 'On an industrial site the electrical installation is part of the plant. It gets treated as background until it stops, at which point it is the most important thing on the premises. Most of the value is in doing it in a way that can be worked on later: labelled, documented, isolatable and accessible.',
    signsTitle: 'Industrial work we carry out',
    signs: [
      'Three-phase distribution boards, sub-mains and isolators',
      'Supplies to machinery, including local isolation for safe maintenance',
      'Workshop and unit installations: power, lighting and containment',
      'Trunking, tray and conduit installed to be extended later, not fought with',
      'Additional capacity where a unit has outgrown its original installation',
      'Fault finding and repairs on plant and distribution, planned around production'
    ],
    process: [
      ['Survey the supply and the load', 'The incoming supply, existing distribution and spare capacity are established before anything is added, because that decides what is actually possible.'],
      ['Plan around production', 'Shutdown windows are agreed up front so work happens when it costs least, rather than stopping a line mid-shift.'],
      ['Install with maintenance in mind', 'Containment and distribution are installed to be worked on and extended: labelled, accessible and with room left in it.'],
      ['Isolation and safety', 'Local isolation is provided where machinery needs to be worked on, so it can be made safe properly rather than by pulling a plug and hoping.'],
      ['Test, certify and document', 'Circuits are tested and certificated, and the distribution labelled and recorded so the next person can work on it without tracing everything from scratch.']
    ],
    faqs: [
      ['Do you work on three-phase installations?', 'Yes. Three-phase distribution, machinery supplies and industrial control gear are part of the commercial and industrial side of the business.'],
      ['Can you work outside our production hours?', 'Yes, and on most industrial jobs it is the sensible way round. Shutdown windows and out-of-hours slots are agreed when the job is planned so the work does not cost more in lost production than it does in labour.'],
      ['Our unit keeps tripping when machines start. Why?', 'A large motor draws a heavy inrush current at start-up, and if the protective device or the supply is marginal it will trip. Sometimes it is the device rating or type, sometimes it is genuinely insufficient capacity for what has been added over the years. Testing tells you which, and they have very different answers.'],
      ['Do you carry out testing on commercial premises?', 'Yes. Commercial and industrial installations need periodic inspection and testing in the same way domestic ones do, generally more often given the loads involved and their duty cycle. Insurers frequently ask for it.'],
      ['Can you add capacity to an existing board?', 'If there is spare capacity, yes. If there is not, the answer is usually a sub-main and a new distribution board rather than trying to squeeze another way into a board that is already full and already warm.']
    ]
  },
  {
    slug: 'electrical-maintenance-and-upgrades',
    nav: 'Maintenance and upgrades',
    h1: 'Electrical maintenance and upgrades',
    title: 'Electrical Maintenance and Upgrades',
    icon: 'wrench',
    blurb: 'Ongoing maintenance, small works, replacements and upgrades for homes, landlords and businesses.',
    answer: 'Electrical maintenance is the ongoing work that keeps an installation safe and working: replacing failed accessories, repairing damage, upgrading tired parts of an installation before they fail, and putting right the items an EICR has flagged. For landlords and businesses it also means having somebody who already knows the property, so a call-out does not start with an hour of working out how the place is wired.',
    intro: 'Most electrical problems give notice. A socket that has started to feel warm, a breaker that trips once a month, an extractor that has stopped working, a light that only comes on if you jiggle the switch. Dealing with them as they appear is cheaper and far less disruptive than waiting for the day they all matter at once.',
    signsTitle: 'Maintenance and small works',
    signs: [
      'Replacing damaged, cracked or discoloured sockets and switches',
      'Extractor fans, cooker hoods and shower units replaced or repaired',
      'Remedial work following an EICR, coded item by coded item',
      'Landlord maintenance between tenancies, done in the changeover window',
      'Upgrading tired accessories and light fittings during redecoration',
      'Smoke and heat alarm replacement, including interlinked systems'
    ],
    process: [
      ['Tell us what is wrong', 'A description, or a photo on WhatsApp, is usually enough to tell whether it is a small job, a repair, or something that needs looking at first.'],
      ['Fit it in sensibly', 'Small jobs get grouped where it makes sense, so you are not paying for three separate visits to do three ten-minute tasks.'],
      ['Do it properly', 'Even a socket change involves checking what is behind it. A discoloured faceplate usually means a connection that has been getting hot, and swapping the front and walking away misses the actual fault.'],
      ['Certificate where required', 'Alterations and additions get a Minor Works Certificate with the relevant test results, so there is a record of what was done.'],
      ['Leave it clean', 'Dust sheets down, mess taken away. On a small job it is the whole impression you are left with.']
    ],
    faqs: [
      ['Do you take on small jobs?', 'Yes. A single socket, a light fitting, an extractor fan or a switch that has stopped working are all normal work. Grouping a few small items into one visit is usually the sensible way to do it.'],
      ['Can you do the remedial work from my EICR?', 'Yes, whoever carried out the report. Send the report over and each coded item can be gone through so you know what actually has to be done to satisfy it and what is a recommendation you can weigh up.'],
      ['Do you work for landlords and letting agents?', 'Yes. Landlord work is a regular part of the business, from EICRs and remedial work through to maintenance between tenancies. Changeover windows are tight, so those jobs get planned around the date rather than fitted in afterwards.'],
      ['My extractor fan has stopped. Is that an electrician’s job?', 'Usually. It may be the fan itself, the isolator, the timer module or the switched live from the light. Diagnosing which is quick, and in a bathroom the replacement has to be right for the zone it sits in.'],
      ['How often should smoke alarms be replaced?', 'Most manufacturers give a working life of around ten years, after which the sensor degrades whether or not the unit still beeps when tested. If yours have a date stamp on the back and it is more than a decade ago, they are due.']
    ]
  }
];

/* ---------- LOCATIONS ----------
   `context` must be genuinely specific to the town: its housing stock, its
   age, and the electrical problems that follow from both. Ten near-identical
   town pages read as duplicate content and get treated accordingly, which is
   also why there is no service-by-town matrix. */
const locations = [
  {
    slug: 'ripley', name: 'Ripley', county: 'Derbyshire', home: true,
    context: 'Ripley is home, so it is the area we know best and the one we are in most days. The town grew around the Butterley Company and the coal that came with it, which left a large stock of Victorian and Edwardian terraces around the centre and along the roads out towards Codnor and Waingroves. Terraced property of that age has usually been rewired at least once, and the question is normally when: an installation from the 1970s or early 1980s will have a plastic board, no RCD protection and often a lighting circuit with no earth. Around that core sit substantial post-war and 1960s estates, most now at the stage where the original consumer unit is the oldest thing left in the house.',
    nearby: ['Codnor', 'Waingroves', 'Marehay', 'Denby', 'Swanwick', 'Butterley']
  },
  {
    slug: 'belper', name: 'Belper', county: 'Derbyshire',
    context: 'Belper sits in the Derwent Valley Mills World Heritage Site, and that shapes electrical work in the town more than anything else. The mill workers’ housing on Long Row and the streets around it is listed, much of the centre is a conservation area, and stone walls with no cavity leave very little scope for hiding cable. Rewiring property like this is as much about routing and making good as it is about the electrics, and surface containment that would be acceptable elsewhere is not. Away from the historic core, Belper has a good deal of twentieth century housing on the slopes out towards Milford and Openwoodgate where the constraints are ordinary.',
    nearby: ['Milford', 'Ambergate', 'Openwoodgate', 'Kilburn', 'Duffield', 'Heage']
  },
  {
    slug: 'derby', name: 'Derby', county: 'Derbyshire',
    context: 'Derby is the biggest single source of EICR work we do, because of the size of its private rented sector. Normanton, Pear Tree and the streets around the university are dense Victorian terraces, a great many of them let, and every one of those tenancies needs a satisfactory report at least every five years. The suburbs are a different job entirely: Allestree, Mickleover, Littleover and Chaddesden are largely post-war semis and estates, where the common work is consumer unit upgrades, extra circuits for kitchen extensions, and EV chargers now that most of those houses have off-street parking.',
    nearby: ['Allestree', 'Mickleover', 'Littleover', 'Chaddesden', 'Spondon', 'Alvaston']
  },
  {
    slug: 'heanor', name: 'Heanor', county: 'Derbyshire',
    context: 'Heanor and the villages around it grew on coal, and the housing reflects it: rows of terraces built for pit families, then large council-built estates from the 1950s and 1960s, many since sold into private hands. Ex-local-authority property tends to share an electrical history, because whole streets were built and later upgraded at the same time. That means the same board, the same accessories and the same age of cable turning up house after house, and it usually means the whole street reaches the point of needing attention within a few years of each other.',
    nearby: ['Loscoe', 'Langley Mill', 'Marlpool', 'Aldercar', 'Shipley', 'Smalley']
  },
  {
    slug: 'ilkeston', name: 'Ilkeston', county: 'Derbyshire',
    context: 'Ilkeston is the largest town in Erewash and it has the housing mix to match: Victorian and Edwardian terraces climbing the hill around Bath Street, interwar semis spreading out towards Cotmanhay and Kirk Hallam, and newer estates on the edges. The older terraced stock is the interesting part electrically, because a lot of it has been extended, converted or split over the years, and each of those alterations added circuits. Testing frequently turns up a borrowed neutral or a spur off a spur left behind by work somebody did decades ago.',
    nearby: ['Cotmanhay', 'Kirk Hallam', 'Shipley View', 'Awsworth', 'Stanton by Dale', 'West Hallam']
  },
  {
    slug: 'alfreton', name: 'Alfreton', county: 'Derbyshire',
    context: 'Alfreton and the villages either side of it, Somercotes, Riddings and Swanwick, are former mining communities with the housing stock that goes with it. There is a lot of solid-wall terraced property here, which matters for a rewire because there is no cavity to drop cable down and chasing solid stone or brick is slower than chasing a modern block wall. There is also a good deal of ex-local-authority housing built in the same waves as Heanor’s, with the same tendency for whole streets to need the same work at the same time.',
    nearby: ['Somercotes', 'Riddings', 'Swanwick', 'Leabrooks', 'Pye Bridge', 'South Normanton']
  },
  {
    slug: 'matlock', name: 'Matlock', county: 'Derbyshire',
    context: 'Matlock is Derbyshire Dales property: stone-built, often Victorian, frequently on a slope, and a good deal of it either listed or in a conservation area. Stone walls and stone floors make cable routing the hardest part of any job here, and outbuildings converted into offices and holiday lets are common enough to be their own category of work, usually needing a proper armoured supply rather than the extension lead they have been running on. Matlock and Matlock Bath also carry a lot of holiday letting, which brings the same inspection requirements as any other let property.',
    nearby: ['Matlock Bath', 'Darley Dale', 'Tansley', 'Wirksworth', 'Cromford', 'Bonsall']
  },
  {
    slug: 'chesterfield', name: 'Chesterfield', county: 'Derbyshire',
    context: 'Chesterfield spreads a long way, and most of that spread is twentieth century: large post-war estates at Newbold, Hasland, Brimington and Staveley, built at a time when a house was wired for a fraction of the load a modern one carries. The recurring job is capacity. A kitchen full of appliances, a shower, and now an electric car all being asked of an installation designed around a cooker and a couple of lights. Consumer unit upgrades and additional circuits make up the bulk of the work, along with EICRs on a sizeable rented sector closer to the town centre.',
    nearby: ['Brimington', 'Hasland', 'Newbold', 'Staveley', 'Whittington', 'Wingerworth']
  },
  {
    slug: 'nottingham', name: 'Nottingham', county: 'Nottinghamshire',
    context: 'Nottingham means houses in multiple occupation. Lenton, Dunkirk, Beeston and the streets around both universities are dominated by student lets, and an HMO carries stricter obligations than an ordinary tenancy: more frequent inspection, interlinked alarm systems, and an installation being used far harder than the family house it was built as. Elsewhere the city is the usual mix of Victorian terraces in the inner suburbs and post-war estates further out, but the rented sector is what drives most of the testing and remedial work.',
    nearby: ['Beeston', 'Lenton', 'Bulwell', 'Arnold', 'West Bridgford', 'Stapleford']
  },
  {
    slug: 'eastwood', name: 'Eastwood', county: 'Nottinghamshire',
    context: 'Eastwood sits on the Derbyshire border in the corridor between Heanor and Nottingham, and it has the same mining history as its neighbours: rows of colliery terraces, the D. H. Lawrence birthplace among them, and later estates built out towards Newthorpe and Giltbrook. The terraces are small, solid-walled and often extended at the back, which tends to mean a kitchen circuit added at some point that was never quite up to what a modern kitchen asks of it. Being on the county boundary, it is a normal part of our working week rather than a trip out.',
    nearby: ['Newthorpe', 'Giltbrook', 'Kimberley', 'Brinsley', 'Underwood', 'Awsworth']
  },

  /* Added 2026-08-24 to close the gap against the Google Business Profile,
     which lists Codnor and Swanwick as service areas while the site had a page
     for neither. Google cross-references the two lists, and it was the one
     local signal fully within our control.

     APPENDED rather than slotted into geographic order, on purpose:
     locationPage picks its fourth FAQ with `rotating[i % rotating.length]`, so
     inserting these mid-array would silently reword six pages that are already
     indexed. At the end, every existing page stays byte-identical.

     Both are ex-mining Amber Valley villages minutes from Ripley, which is the
     trap. Written carelessly they would repeat what Ripley, Heanor and
     Alfreton already say about pit terraces and ex-council estates, and four
     near-identical pages are worth less to Google than two distinct ones. So
     Codnor is written around its pre-mining core and the industrial units at
     Codnor Gate, and Swanwick around its newer estates, where the problem is
     load growth rather than ageing cable. */
  {
    slug: 'codnor', name: 'Codnor', county: 'Derbyshire',
    context: 'Codnor sits on the high ground between Ripley and Heanor, close enough that it is part of the normal week rather than a trip out. The village has an older core of stone and solid-brick cottages that predate the mining terraces around it, and those take the most care: there is no cavity to drop a cable down, ceilings are low, and most have been altered or extended more than once, so what is behind a wall is rarely what the layout suggests. Along the main road are the terraces, and behind them the newer closes, which means there is no single typical Codnor house. The units at Codnor Gate are a different job again, and three-phase work on an industrial estate is as ordinary to us as a domestic board change.',
    nearby: ['Ripley', 'Waingroves', 'Loscoe', 'Codnor Park', 'Golden Valley', 'Heanor']
  },
  {
    slug: 'swanwick', name: 'Swanwick', county: 'Derbyshire',
    context: 'Swanwick has more modern housing than most of the villages around it, and that changes what we get called out for. A house built in the last twenty years does not need rewiring; what it needs is more out of its installation than it was designed to give, whether that is a charger on the drive, a hot tub, a garden room at the bottom of the plot or an island added to the kitchen. That is a question about spare ways, cable size and what the existing board will take rather than about ageing wiring, and it is worth asking before the trench is dug rather than after. The older part of the village is the familiar mining stock it shares with Alfreton and Riddings, and there the work is the usual rewires, board changes and testing.',
    nearby: ['Alfreton', 'Leabrooks', 'Somercotes', 'Riddings', 'Pentrich', 'Ripley']
  }
];

/* ---------- GALLERY ----------
   Every photograph is the company's own work. Alt text describes what is
   actually in the frame, because the audit found all eight photos on the
   old site shared the alt text "Gallery Image".

   g1-g8 are the first batch. g9-g27 arrived 2026-08-22 and are keyed to the
   client's own numbering: g9 is his 1.jpeg, g27 his 19.jpeg, which is worth
   keeping straight because his two batches both start at 1 and 1.jpg is a
   different photograph from 1.jpeg. See site/make-photos.sh.

   The whole array renders on /our-work/. The homepage takes the first six,
   so the order here decides what a first-time visitor sees.

   Nothing in the alt text is inferred. Equipment is named only where the
   label is legible in the frame - the FuseBox unit and its surge device in
   g27, the Kewtech tester in g15 - and nothing claims a scheme, a standard
   or a price. */
const gallery = [
  ['g1.jpg', 'Brushed steel double socket with USB charging, newly installed and chased into a bare plaster wall'],
  ['g2.jpg', 'Navy shaker kitchen with glass globe pendants over the breakfast bar and recessed downlights through the ceiling'],
  ['g3.jpg', 'Bank of three double sockets installed in a line along a freshly painted wall'],
  ['g4.jpg', 'Wall-mounted electric car charge point installed on the brickwork of a house'],
  ['g5.jpg', 'Open-plan kitchen and dining space with three glass pendant lights over the island and downlights beyond'],
  ['g6.jpg', 'Renovated room with recessed downlights, exposed stone wall and a slatted oak feature wall with flush sockets'],
  ['g7.jpg', 'Bathroom with an illuminated LED mirror, brass wall light and an electric shower installed in a tiled recess'],
  ['g8.jpg', 'Living room after renovation with downlights set through the ceiling and a restored stone fireplace'],
  ['g9.jpg', 'Finished kitchen in matt black with a wood-effect worktop, downlights set through the ceiling and lighting under the wall units'],
  ['g10.jpg', 'Black surface-mounted spotlights installed across a newly plastered ceiling in an open-plan room, lit and working before the room is decorated'],
  ['g11.jpg', 'Vaulted ceiling with two roof windows and downlights fitted into the slope between them'],
  ['g12.jpg', 'Room at plastering stage with the new downlights and spotlights already installed and switched on'],
  ['g13.jpg', 'Outdoor lighting at dusk over a catering unit and seating area, with lamps along the canopy and the serving hatch lit'],
  ['g14.jpg', 'Weatherproof outdoor socket recessed into a plywood-lined wall, with the cable coiled ready for second fix'],
  ['g15.jpg', 'Testing in progress at a consumer unit, with a Kewtech multifunction tester clipped to the circuit conductors'],
  ['g16.jpg', 'Outdoor distribution board in a lockable steel enclosure, with two industrial blue sockets mounted on the wall beside it'],
  ['g17.jpg', 'Converted loft room with white painted brickwork, adjustable wall spotlights and a ceiling light over the exposed chimney breast'],
  ['g18.jpg', 'Wall-mounted electric car charger on a house wall, plugged in and charging, with the car on the drive behind'],
  ['g19.jpg', 'Finished kitchen in sage green with downlights through the ceiling, a wood-effect worktop and a lit extractor over the hob'],
  ['g20.jpg', 'Three-phase switch and busbar inside a distribution board, with the incoming tails and earthing terminated and the ways numbered'],
  ['g21.jpg', 'Utility area and rear porch with a downlight over the fitted units'],
  ['g22.jpg', 'Living room media wall in slatted timber, with concealed lighting to the shelves, a wall-mounted television and an electric fire below'],
  ['g23.jpg', 'Brick house lit at night by exterior downlights washing the walls and lighting the path around it'],
  ['g24.jpg', 'Garden room and patio lit at night by wall lights along the length of the building'],
  ['g25.jpg', 'Junction box opened up with the brass cover plate lowered, showing the connector blocks and the cables landed in them'],
  ['g26.jpg', 'LED strip lighting fitted along the inside of a fitted wardrobe, lighting the rail below'],
  ['g27.jpg', 'New FuseBox consumer unit with the cover off, fully populated with circuit breakers, a 100 amp main switch and a surge protection device, and every circuit cable terminated']
];

/* Genuine pair: the same kitchen stripped back to brick with the props in,
   and finished. Before goes first. */
const beforeAfter = {
  before: ['ba-before.jpg', 'Kitchen stripped back during renovation, with acrow props, a steel beam and first-fix cable runs in place'],
  after: ['ba-after.jpg', 'The same kitchen finished, with pendant lighting over the island and downlights through the ceiling'],
  caption: 'The same kitchen: first fix during the renovation, and finished. Lighting positions were set out at the stage on the left, which is the only point at which they can be.'
};

/* ---------- GENERAL FAQs ----------
   These live on /faqs/ and feed the areas hub. They are deliberately NOT on
   the homepage: FAQ content belongs on its own page. */
const generalFaqs = [
  ['Are you a qualified electrician?',
   'Yes. Stephen holds a completed electrical apprenticeship, the Level 3 NVQ in Installing Electrotechnical Systems and Equipment, the Level 3 Award in Inspection and Testing (2391), the Level 3 EV charging equipment installation qualification, and works to BS 7671, the 18th Edition Wiring Regulations. All staff are qualified and up to date with current regulations.'],
  ['Are you insured?',
   'Yes. S. Sparham Electrical carries £1 million of public liability insurance, and all work is covered by a 12-month guarantee.'],
  ['What areas do you cover?',
   'Ripley, Belper, Derby, Heanor, Ilkeston, Alfreton, Matlock, Chesterfield, Nottingham and Eastwood, plus the towns and villages around them across Derbyshire and Nottinghamshire. If your town is not listed it is still worth ringing, because the list is the main areas rather than a hard boundary.'],
  ['How do I get a quote?',
   'Call or text 07557 448945, or send a photo of the job on WhatsApp. For anything small, a photograph and a description are often enough to give you a figure without anyone coming out. Larger work such as a rewire or a consumer unit change needs looking at properly first. Quotes are free and there is no obligation.'],
  ['Do you charge for quotations?',
   'No. Quotations are free.'],
  ['Do you work on domestic, commercial and industrial jobs?',
   'All three. Domestic work makes up most of it, but the business also covers commercial premises such as shops, offices and salons, and industrial work including three-phase distribution and machinery supplies.'],
  ['Will I get a certificate for the work?',
   'Yes, where one applies. A new circuit or a rewire gets an Electrical Installation Certificate. An addition or alteration to an existing circuit gets a Minor Electrical Installation Works Certificate. An inspection gets an Electrical Installation Condition Report. All of them carry the test results and all are worth keeping, because you will be asked for them when you sell or let the property.'],
  ['Is your work guaranteed?',
   'Yes, for 12 months. If something is not right after we have left, we come back and put it right.'],
  ['Do I need to be at home while you work?',
   'For most jobs somebody needs to let us in and be there at the end, but you do not need to stand over the work. Several of our customers have left us with access to the property and come back to it finished and locked up.'],
  ['How messy is electrical work?',
   'Honest answer: chasing walls and lifting floors makes a mess while it is happening. What matters is what it looks like afterwards. Everything gets cleaned down and taken away, because leaving somebody’s house full of dust and offcuts is not finishing the job.'],
  ['Do you take on emergency and same-day work?',
   'Where we can. A dangerous fault, a burning smell or a dead circuit in an occupied property gets treated as urgent. Call 07557 448945 and you will be told honestly when somebody can get to you, rather than being promised a time that will not happen.'],
  ['Can you work around a tenant or a business?',
   'Yes. Landlord work is planned around changeover dates, and commercial jobs are planned around trading hours or shutdown windows so the work does not cost more in lost business than it does in labour.']
];

module.exports = {
  SITE_URL, biz, pending, credentials, badges, projects, ratings, reviews,
  services, locations, gallery, beforeAfter, generalFaqs
};
