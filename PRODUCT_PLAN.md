# Radial Preference Controls Product Plan

Status: draft
Target context: Shape Rotator cohort profiles and people-routing surfaces
Source baseline inspected: `C:/Users/micha/OneDrive/Documents/Flashbots x/external/shape-rotator-os`

## Product Thesis

The cohort needs a participant-owned way to express current posture, not just static biography.

The control should answer:

> What am I open to right now, how should people route opportunities to me, and what kind of contribution am I trying to make?

This must not become a ranking, personality test, proficiency score, or surveillance graph. It is a live preference instrument: editable, explicit, visually memorable, and useful for routing introductions, office hours, asks, and pairings.

## Why This Is Needed

Shape Rotator OS already has a strong public/cohort data boundary and useful fields: `now`, `skills`, `skill_areas`, `seeking`, `offering`, `availability_pref`, `contribute_interests`, and weekly intention. The gap is that those fields are uneven and text-heavy.

People need a faster self-report layer that captures:

- whether they are exploring or committed
- whether they want help, can help, or want pairing
- whether they are available now, later, or heads-down
- whether their profile reads as design, engineering, strategy, research, ops, or some mix
- what kind of opportunities they are open to without writing a perfect bio

## Core Concept

Build two controls side by side:

1. **Internal posture control**: three physical-feeling circular dials arranged in a triangle. This captures current mode and availability.
2. **External profile control**: a radar or polygon control with shaped vertices. This captures outward-facing contribution identity: design, engineering, strategy, research, ops, etc.

Together they create a preference snapshot. The snapshot can be saved to a person profile, updated weekly, and used by routing/search surfaces as declared evidence.

## Control A: Tri-Dial Posture

### Purpose

This control captures the participant's current internal state: what kind of interaction they want from the cohort this week.

### Candidate Dimensions

Use exactly three for v0 so the triangle stays legible:

- **Explore**: "I am still figuring out direction; show me adjacent people, ideas, and examples."
- **Commit**: "I know what I am trying to ship; route specific help, feedback, or blockers."
- **Contribute**: "I have capacity to help others; send asks, reviews, or pairing opportunities."

Alternate set if availability matters more than intention:

- **Focus**: heads-down / protect time
- **Pair**: open to live collaboration
- **Route**: open to intros, async asks, and lightweight review

Recommendation: start with `Explore / Commit / Contribute`. It is higher-signal than pure availability because it describes routing intent, not just calendar state.

### Interaction Model

Three non-overlapping circular dials sit at triangle vertices. Each dial has:

- a rim with tick marks
- a grip notch or pointer
- a value arc
- a short label
- a small shape/glyph inside the dial

The user can grab any dial and rotate it like turning a physical knob. Rotation changes that dimension's weight. The other two dials adjust in response so the total remains 100.

Example:

- increasing `Contribute` from 20 to 45 reduces `Explore` and `Commit` proportionally
- holding a modifier or pinning a dial can lock one dimension while the other absorbs the change
- keyboard users can focus a dial and use arrow keys in 5-point increments

### Why Tri-Dial Instead Of Sliders

Sliders feel like form inputs. This should feel like setting an instrument. The hand motion matters: a small rotation communicates "tuning my current stance" better than dragging text boxes.

### State Readout

At rest, the control should produce a plain sentence:

> "This week I am mostly contributing, still exploring a bit, and not in a committed ask mode."

The sentence is generated from thresholds, not freeform inference. It gives people a way to confirm the control means what they intended.

## Control B: External Radar / Shape Profile

### Purpose

This control captures outward-facing contribution identity: how others should understand the person's useful surface area.

### Candidate Dimensions

Start with five or six. Four is too coarse; more than six makes the radar noisy.

Recommended v0:

- **Engineering**
- **Design**
- **Strategy**
- **Research**
- **Community / Ops**
- **Go-to-market**

Shape Rotator's controlled vocabulary can map into these higher-level buckets:

- `design` -> Design
- `bd-gtm` -> Go-to-market
- `research-to-product`, `mechanism-design`, protocol fields -> Research / Strategy
- `tee`, `agent-runtime`, `zk`, `p2p`, etc. -> Engineering / Research depending on context

### Visual Design

Use a radar polygon with distinct vertex shapes rather than only labels:

- circle: Design
- square: Engineering
- triangle: Strategy
- hexagon: Research
- diamond: Ops
- pill/capsule or pentagon: GTM

The filled polygon shows current self-declared mix. Each vertex can be dragged outward/inward. Values do not have to sum to 100 because identity is not zero-sum.

This is the important contrast:

- tri-dial posture is allocation-like and sums to 100
- radar profile is capacity/interest-like and can have many high or low values

### Interaction Model

- drag a vertex to set a dimension
- rotate the entire radar slightly to reorder dimensions only in edit mode if needed
- click a shape vertex to expand examples: "What counts as Strategy?"
- hover/focus shows linked `skills`, `skill_areas`, `offering`, and `seeking` fields that support the value
- tap "refresh from profile" to seed values from existing Shape Rotator fields

### State Readout

At rest, the profile should say something like:

> "External read: engineering-heavy with strategy and research overlap; design is secondary."

Again, this should be threshold-based and participant-confirmed.

## Side-By-Side Product Surface

The first product surface should show both controls together:

- left: internal tri-dial posture
- right: external radar/profile shape
- bottom: generated routing sentence
- side rail or lower tray: editable evidence fields that generated or support the values

The goal is not to produce a "cool widget" in isolation. It should produce data that improves cohort routing.

Minimum saved output:

```yaml
preference_snapshot:
  schema_version: 1
  updated_at: "2026-05-25"
  internal_posture:
    explore: 35
    commit: 25
    contribute: 40
  external_profile:
    engineering: 80
    design: 35
    strategy: 65
    research: 55
    ops: 20
    gtm: 25
  availability:
    status: "open-to-async"
    note: "Can review two projects this week, prefer async first."
  routing_preferences:
    wants:
      - "high-context intros"
      - "technical review"
    avoids:
      - "generic networking"
  visibility: "cohort-public"
  source: "self-declared"
```

## Shape Rotator Integration

### Data Model

Add a participant-owned preference block to person records or a sibling record directory.

Option A: inline person frontmatter

- best for simple PR edit flow
- easy to expose in `cohort-surface.json`
- risks making person markdown too large

Option B: `cohort-data/preferences/<person-id>.md`

- cleaner history for weekly updates
- easier to expire or version snapshots
- better if this becomes a recurring ritual

Recommendation: use Option B for v1. Keep the latest snapshot in the public/cohort surface bundle, and preserve prior snapshots only if the participant opts in.

### Visibility

Preference data should follow Shape Rotator's existing source-boundary model:

- public: only if participant explicitly chooses public
- cohort-public: default for routing inside the cohort
- organizer-only: allowed for availability or support needs
- private/local draft: unsaved state before publication

No derived posture should be shown as fact. If a value is inferred from profile text, label it as a seed and require participant confirmation.

### Existing Fields To Reuse

- `now`
- `weekly_intention`
- `availability_pref`
- `contribute_interests`
- `seeking`
- `offering`
- `skills`
- `skill_areas`
- `domain`

The controls should not replace these. They make the text easier to maintain and route against.

## Routing Uses

The preference snapshot can improve:

- profile cards: show posture and external profile summary
- search: "people open to contribute on design review this week"
- match board: route asks only to people with compatible posture
- office hours: group people by explore/commit/contribute state
- pair requests: suggest people with high `Contribute` and related external profile
- organizer readouts: see cohort support load without ranking individuals

Route explanations must use declared values:

> "Suggested because Sam marked `Contribute` high this week and has Design + Strategy profile weight, with offering text mentioning wallet UX review."

## Hypotheses To Test

### Hypothesis 1: Participants prefer tuning over form-filling

If the control feels like a quick weekly ritual, people will update it more often than long text fields.

Test: compare completion/update rate against plain profile form fields.

### Hypothesis 2: Allocation works for posture but not identity

Internal posture should sum to 100 because attention is scarce. External identity should not sum to 100 because people can be strong in multiple areas.

Test: ask participants if forced tradeoffs on external profile feel wrong. They probably will.

### Hypothesis 3: Shape labels reduce radar-chart ambiguity

Radar charts are often hard to read. Distinct vertex shapes plus direct labels may make the profile legible without relying on color alone.

Test: show profiles without names and ask what kind of help this person is likely to offer.

### Hypothesis 4: Generated sentences are necessary

Novel controls need confirmation. A short generated sentence will catch mis-set dials and prevent beautiful but ambiguous data.

Test: user edits values, then confirms whether the sentence matches their intent.

### Hypothesis 5: Weekly snapshots beat permanent traits

The cohort changes quickly. "This week I can help" is more useful than "I am a helpful person."

Test: expire or soften stale snapshots after 7-10 days and see if routing quality improves.

## Known Gaps And Risks

- **Radar distortion**: area can exaggerate differences. Use direct values, grid rings, and text summaries so the polygon is not the only evidence.
- **False precision**: 73 versus 76 is not meaningful. Store integers but display coarse bands: low, medium, high.
- **Personality-test smell**: avoid archetype labels unless participant-authored. No "builder type" badges generated by the system.
- **Leaderboard pressure**: never aggregate into "most helpful" or "most available" rankings.
- **Accessibility**: rotational controls are hard for motor/keyboard users unless there are stepper controls and direct numeric/band editing.
- **Touch ergonomics**: circular dials need large hit targets and should not conflict with page scroll.
- **Staleness**: a preference snapshot without a date is dangerous. Always show "updated X days ago" and degrade routing confidence over time.
- **Schema mismatch**: Shape Rotator's current person fields are text/list oriented. Preference snapshots need explicit schema and validation.
- **Privacy boundary**: availability and support needs may be sensitive. Default to cohort-public for routing, not public web.

## Implementation Plan

### Phase 0: Paper Prototype

Goal: decide the dimensions and semantics before building.

Tasks:

- draw three versions of the tri-dial labels
- draw two radar dimension sets: 5-axis and 6-axis
- write the generated sentence rules
- map current Shape Rotator fields into seed values
- pick visibility defaults

Done when five participants can look at the sketch and explain what their saved state would mean.

### Phase 1: Static Interactive Prototype

Goal: build the two side-by-side controls with no backend.

Tasks:

- implement tri-dial rotation with proportional redistribution
- implement radar vertex dragging
- add keyboard/focus equivalents
- add generated summary text
- add reset/seed/demo states
- add local JSON export

Done when a participant can set a plausible snapshot in under 60 seconds.

### Phase 2: Schema And Shape Rotator Adapter

Goal: make the prototype produce Shape Rotator-compatible data.

Tasks:

- define `preference_snapshot` schema
- decide inline person frontmatter vs `cohort-data/preferences`
- write seed logic from existing fields
- add validation for 0-100 ranges and visibility
- document source boundary: self-declared vs inferred seed

Done when exported data can be reviewed and merged through the existing PR loop.

### Phase 3: Cohort Profile Integration

Goal: make preferences visible where routing decisions happen.

Tasks:

- add compact posture glyph to person cards
- add external profile polygon to person detail pages
- expose "updated at" and visibility
- show evidence fields that support the profile
- add edit/update action

Done when profiles answer: "what should I ask this person about this week?"

### Phase 4: Routing Integration

Goal: use declared preferences to improve matching.

Tasks:

- add preference fields to search index
- add route explanations that cite preference snapshot and profile fields
- filter stale snapshots
- support queries like "who can help with design review this week?"
- avoid ranking by availability; group and explain instead

Done when match cards can say why a person is a good route without using a mystery score.

## Prototype Behavior Details

### Tri-Dial Value Logic

Rules:

- values sum to 100
- dragging one dial sets its value
- remaining delta is taken from or given to the other two dials proportionally
- if one dial is pinned, all delta moves to the unpinned dial
- minimum value per dial defaults to 0, but a soft minimum of 5 can prevent dead-looking states

Pseudo-flow:

```text
onDialRotate(target, nextValue):
  delta = nextValue - current[target]
  adjustable = other dials not pinned
  subtract/add delta across adjustable dials based on their current share
  normalize to exactly 100
  update generated summary
```

### Radar Value Logic

Rules:

- each axis is independent 0-100
- display bands: low 0-30, medium 31-70, high 71-100
- dragging a vertex changes only that axis
- optional "smooth profile" button can reduce spikes, but should not be default

### Generated Summary Logic

Internal:

- highest value over 45 becomes "mostly X"
- values 25-45 become "also Y"
- values under 15 are omitted unless all values are balanced
- stale snapshots append "last updated N days ago"

External:

- high axes become primary profile words
- medium axes become secondary overlap
- low axes are not framed as deficits

## Open Questions

- Should the tri-dial be `Explore / Commit / Contribute` or `Focus / Pair / Route`?
- Should availability be a fourth lightweight field outside the tri-dial instead of one of the dials?
- Should external profile include `Research` and `Strategy` separately, or merge them for the cohort?
- Should participants see inferred seed values before editing, or start from neutral values?
- Should old snapshots be retained for personal history, organizer trend view, or not stored at all?
- How much of this belongs in Shape Rotator OS versus a separate experimental radial-controls repo?

## Recommended First Build

Build a standalone prototype in this repo first:

- one page
- two controls side by side
- seeded example person
- generated summary
- export JSON
- no backend

Use Shape Rotator's visual language lightly: dark editorial surface, crisp labels, stable shape glyphs, no decorative chartjunk. Once the interaction is proven, wire the schema into Shape Rotator OS.

## Demo One Revision

The first demo should now use three definition controls and a reveal surface:

- **Internal posture**: `Explore / Commit / Contribute`
- **External profile**: `Engineering / Design / Strategy / Research / Ops / GTM`
- **Collaboration mode**: `Focus / Pair / Review / Route`

Each control owns a separate 100-point budget. All values start at zero. Dragging a point outward spends points; dragging inward returns points. If a user raises one axis after the budget is full, the other axes reduce proportionally so the control remains capped at 100.

The bottom reveal shape is not a fourth form field. It is a visual synthesis of the three allocations:

- color comes from the three controls
- vertices come from the selected axis weights
- the generated name comes from the dominant internal, external, and collaboration axes
- the reveal is locked until all three budgets are complete
- the participant can adjust line length to make the route compact or more expansive
- the reveal can show a shape, a text trail, or both

This keeps the demo explainable: three ways to define yourself, one shape at the end.

The text trail is a parallel readout for the same path. It should write like:

`role ▸ node 1: commit ▸ profile 1: engineering ▸ mode 1: review`

This gives the visual glyph a reference line without turning the experience back into a standard form.

## Onboarding Shape-Reveal Variant

This prototype should turn onboarding into a concealed drawing ritual:

- the participant answers normal onboarding prompts rather than being asked to draw
- each setup field is a radial chart of cohort-derived suggestions
- `Other` is always present at the bottom of the radial chart and opens text entry
- each answer places one vertex in a route trace distributed around the full circle
- between stages, the drawing field rotates and translates so previous lines drift left and are harder to recognize
- after the final answer, the field recenters and closes the selected route into a named jagged glyph
- the reveal is memorable but not diagnostic; it is an artifact attached to self-declared preferences, not a personality type

Recommended v0 stages:

1. `role`: product/story, engineering, research, design, ops/community, GTM, or Other.
2. `team`: known cohort teams from the current data bundle, no team, or Other.
3. `geo`: common cohort locations/timezone buckets, or Other.
4. `domain`: controlled `skill_areas` vocabulary such as `tee`, `agentic`, `design`, `bd-gtm`, `research-to-product`, or Other.
5. `comm_style`: async with context, DM first, issue/PR, live if stuck, office-hours style, or Other.
6. `contribute_interests`: architecture review, product/interface pass, research critique, intro routing, demo story, or Other.
7. `availability_pref`: async first, live blocks, heads-down, office-hours, later this week, or Other.
8. `weekly_intention`: ship prototype, tighten scope, find users, unblock technical risk, learn context, or Other.
9. `dietary_restrictions`: no restrictions, vegetarian, vegan, halal, allergies, or Other.
10. `anything_else`: nothing else, add context, ask my agent, manual note, or Other.

The hidden path should export alongside the preference snapshot:

```yaml
record_type: person
role: "Product / story"
comm_style: "Async first: send context, artifact, and the concrete ask."
preference_snapshot:
  hidden_shape:
    reveal_name: "keystone lens"
    vertices:
      - stage: role
        choice: "Product / story"
        ring_index: 1
```

The shape must remain user-authored. The system can name it as a lightweight memory hook, but route explanations should cite declared preferences:

> "Suggested because this person marked `Contribute` high, offers product/interface review, and prefers async-first routing."
