# Changelog

All notable changes to the NeoRacer documentation are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow semantic versioning, adapted for documentation:

- **MAJOR**: the docs cover a new car generation, or a ground-up restructure.
  1.0.0 is reserved for the release where no page is gated.
- **MINOR**: the page list changes (a page added, removed, or moved between
  sections), or a page is substantially rewritten.
- **PATCH**: everything else: corrections, polish, and small content
  additions within existing pages.

Each merged pull request bumps the version once and adds its entry here.

## [0.9.0] - 2026-10-29 (#21)

### Added

- Software: the Firmware flashing page is no longer gated. It documents the
  procedure that was run end to end on a car: updating the OSCORE firmware
  with OSR Updater, an application update through the running firmware, with
  the files to download, the services to stop, a problems table, and a
  command-line alternative. It replaces the old browser-flasher draft.

## [0.8.5] - 2026-10-28 (#20)

### Added

- This changelog. The docs now carry version numbers; the current version
  shows in the docs sidebar and links here.
- Drivetrain: the steering servo's full specifications, with a dimensional
  drawing of the servo.
- Charge & Power: the battery compartment's dimensions, under Battery specs.
- Unbox: the ToolkitRC M4AC charger and the Cudy router now link to their
  manufacturer product pages, from the FIG. A caption and from their boxes
  in the figure.

## [0.8.4] - 2026-09-25 (#19)

### Fixed

- Every page declares its own canonical URL. Pages had inherited the site
  root's canonical, so search engines treated the docs as duplicates of the
  homepage.

## [0.8.3] - 2026-09-19 (#18)

### Added

- Drivetrain: a note under The Brushed Motor + ESC explains the ESC's switch
  inside the chassis, with a photo. If the switch is off the car will not
  move; the note covers turning it back on.

## [0.8.2] - 2026-09-11 (#17)

### Fixed

- Remaining NeoRacer V1 mentions become NeoRacer M1.

## [0.8.1] - 2026-08-31 (#16)

### Fixed

- The parts figure on the hardware overview loads with the page instead of
  waiting for scroll.
- The hardware connection diagram on Compute keeps a readable size on phones
  and pans sideways.
- The legal page buttons drop the arrow symbol.

## [0.8.0] - 2026-08-29 (#15)

### Added

- Terms of Service is a new Legal page.

### Changed

- The legal documents are updated to their 8/29/2026 versions, and every
  legal page links its updated official PDF.
- The privacy policy is now a PDF like the rest.

## [0.7.4] - 2026-08-26 (#14)

### Added

- Compute: a hardware connection diagram under The Microcontroller Stack
  shows how signals route between the Jetson, the sensors, the vehicle
  controller, and the chassis hardware.

### Removed

- FAQ: the Playground mention, the F1TENTH question, and the Support section.

## [0.7.3] - 2026-08-25 (#13)

### Added

- Charge & power: a first step to inspect the battery for torn or damaged
  leads before charging.
- Remote desktop: a note offering AnyDesk as an alternative to RustDesk.

### Changed

- Prepare the car: the monitor-and-keyboard note is now titled "Alternative:
  Remote desktop option" and links to the remote desktop page.

## [0.7.2] - 2026-08-25 (#12)

### Added

- The hardware overview's system diagram (FIG. B) is live. Click a component
  to see how it connects, including the exact cables the car ships with.

## [0.7.1] - 2026-08-22 (#11)

### Fixed

- Image references updated to the website's reorganized image paths.

## [0.7.0] - 2026-08-22 (#10)

### Added

- Troubleshooting: the old six-page Diagnostics section consolidated into one
  page of symptom, cause, and fix tables.
- Passwords: every credential the car ships with, in one table, with where to
  change each.

### Changed

- Reference is now five pages: Safety, Troubleshooting, Maintenance,
  Passwords, FAQ. Safety holds the rules, Maintenance holds the schedules,
  Troubleshooting holds symptom-to-fix tables.
- Safety: rewritten as plain instructions in five groups.
- Maintenance joins the nav; schedules and storage rules consolidated.
- FAQ moves into Reference; the warranty answer matches the nine-month term.
- The legal pages link the official policy documents instead of carrying
  their own copy of each policy.

### Removed

- The Calibration section: the procedures were not verified on the car yet.
- Specifications, Glossary, and the compatibility matrix.

## [0.6.0] - 2026-08-22 (#9)

### Changed

- API Reference signatures, defaults, topic names, and parameters now match
  the source.
- The CLI becomes its own group above ROS 2: Overview, Services, Running,
  Maintenance.
- Typed signatures on every Python method, checked against the library
  source; racecar_utils goes by its real name everywhere.
- The topics and params pages are deduplicated; two wrong message types
  fixed.

### Added

- A racecar_core page; every Python page links the upstream library docs.

### Removed

- The ROS 2 services page and the rc.controller page. The camera depth
  methods are no longer documented; they do not work on the NeoRacer.
- TF frames is gated until the autonomy layer ships.

## [0.5.0] - 2026-08-22 (#8)

### Changed

- Software is reordered around connecting first: Networking, Remote desktop,
  File system.
- Networking: reworked with network setup at the top, tabbed by method.
- Remote desktop: a RustDesk setup walkthrough, including the first-connect
  password prompt.
- File system: rewritten as a walk through the home directory.

### Removed

- The driver page (its topic list moved to the API Reference) and the
  racecar-neo-library page (documented in the Python API Reference).
- The JupyterLab page merged into the File system page.
- Gated until verified end to end: OS & image, Firmware flashing, Mapping,
  Navigation, and the 3D model.

## [0.4.0] - 2026-08-22 (#7)

### Changed

- The Hardware section reworked page by page: Overview, Compute, OSCORE
  board, the four sensors, Remote control, Drivetrain, Chassis & CAD, and
  Dot matrix.
- LiDAR, Camera, IMU, and Encoder each have a datasheet card.
- Remote control: one using-the-controller section, an annotated transmitter
  photo, and a channel-mapping walkthrough.
- Safety moves into Reference.

### Added

- Overview: the anatomy figure gains servo, ESC, and motor pins; FIG. B is
  the interactive wiring diagram with clickable signal labels.

### Removed

- The Build section (its component cards moved onto the matching hardware
  pages) and the old electrical, power, reassembly, and sensors-index pages.

## [0.3.2] - 2026-08-12 (#6)

### Fixed

- Unbox: the accessories list now says the box carries two antenna kits, one
  per antenna.

## [0.3.1] - 2026-08-12 (#5)

### Fixed

- The Setup bay on the docs home and the page description now say six pages.

## [0.3.0] - 2026-08-12 (#4)

### Added

- Connect to the router: the pre-configured Cudy Wi-Fi, the SSID sticker
  location, join steps, and the key dashboards at 192.168.10.100.
- Test the system: a screenshot walkthrough of the Async Core Test notebook
  and the expected ALL PASS summary.

### Changed

- Connect to the car is renamed Prepare the car.

## [0.2.0] - 2026-08-11 (#3)

### Added

- Prepare the car: a You'll need list, battery and antenna placement photos,
  and a power-switch-off first step for the battery.

### Changed

- Install the driver rebuilt: the page renders the neoracer-installer
  repository's README, so the README is the single source of truth.

## [0.1.0] - 2026-08-09 (#2)

### Changed

- The Setup section redone after walking the entire setup process from
  scratch: Unbox gains sidepod and allen key cards and marks which
  accessories are extras; Charge & power labels the charger's voltage and
  current readings; Connect to the car becomes a clickable timeline with the
  router first and a realistic 30 minute estimate.

### Removed

- The First program page. Setup now ends at Install the driver.

## [0.0.1] - 2026-06-12

### Added

- The NeoRacer customer documentation, first published as public source under
  GPLv3: Setup, Hardware, Software, API Reference, Reference, and Legal,
  with the interactive 3D robot model page, the docs home with the pit-lane
  navigation, and the reassembly photo guide.
- The ROS 2 pages aligned with neoracer_ros2_driver 0.1.0: the real topic
  contract, node graph, services, and commands (#1).
