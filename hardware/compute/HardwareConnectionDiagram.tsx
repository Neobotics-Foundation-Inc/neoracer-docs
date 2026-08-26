import { NB } from '@/lib/nb-tokens';

/* ─────────────────────────────────────────────────────────────────────────
 * HardwareConnectionDiagram — the manufacturer's hardware connection
 * diagram redrawn in the docs style. Two panels: host signal routing
 * (Jetson to LiDAR, camera, and vehicle controller over USB) and
 * controller signal routing (vehicle controller to ESC, servo, encoder,
 * and RF receiver). A legend keys the four device categories and the
 * one-way / two-way arrows.
 * ───────────────────────────────────────────────────────────────────────── */

const C = {
  host: { border: '#2563EB', fill: '#EFF4FF', text: '#1B3B8F' },
  sensor: { border: '#15803D', fill: '#F0FAF0', text: '#15803D' },
  actuator: { border: '#EA580C', fill: '#FFF4EA', text: '#EA580C' },
  feedback: { border: '#7C3AED', fill: '#F7F3FD', text: '#7C3AED' },
  arrow: '#2563EB',
  green: '#15803D',
  dark: '#1B2036',
};

const mono = { fontFamily: NB.monoFont, fontWeight: 700, letterSpacing: '0.03em' } as const;
const body = { fontFamily: NB.bodyFont } as const;

/* Category-tinted device box: bold title, small description lines. */
function DeviceBox({
  x, y, w, h, cat, title, lines, titleSize = 12.5,
}: {
  x: number; y: number; w: number; h: number;
  cat: { border: string; fill: string; text: string };
  title: string; lines: string[]; titleSize?: number;
}) {
  const cx = x + w / 2;
  const titleY = y + 20;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={cat.fill} stroke={cat.border} strokeWidth={1.8} />
      <text x={cx} y={titleY} textAnchor="middle" style={{ ...mono, fontSize: titleSize }} fill={cat.text}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={cx} y={titleY + 16 + i * 13} textAnchor="middle" style={{ ...body, fontSize: 9.5 }} fill={C.dark}>
          {l}
        </text>
      ))}
    </g>
  );
}

/* Panel header: numbered dot plus title in a dark blue pill. */
function PanelBadge({ x, y, n, title, w }: { x: number; y: number; n: string; title: string; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={34} rx={17} fill={C.host.border} />
      <circle cx={x + 19} cy={y + 17} r={10.5} fill={NB.haloWhite} />
      <text x={x + 19} y={y + 17} textAnchor="middle" dominantBaseline="central" style={{ ...mono, fontSize: 12 }} fill={C.host.border}>
        {n}
      </text>
      <text x={x + 38} y={y + 17} dominantBaseline="central" style={{ ...mono, fontSize: 13.5 }} fill={NB.haloWhite}>
        {title}
      </text>
    </g>
  );
}

export function HardwareConnectionDiagram() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 16px',
        background: NB.beige,
        border: `1px solid ${NB.borderOnBeige}`,
        borderRadius: 12,
      }}
    >
      <svg
        viewBox="0 0 960 690"
        style={{ width: '100%', maxWidth: 860, height: 'auto', display: 'block' }}
        role="img"
        aria-label="Hardware connection diagram. Host signal routing: the Jetson Orin Nano Super connects over USB 3.2 downstream ports to the Richbeam LiDAR and the RGB camera, which provide perception data, and holds a two-way USB link with the vehicle controller carrying control commands out and status feedback back. Controller signal routing: the vehicle controller drives the ESC and the servo over PWM outputs, reads the encoder over a pulse input for status feedback, and takes remote commands from the 2.4 gigahertz RF receiver over a PPM signal."
      >
        <defs>
          <marker id="hcd-blue" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={C.arrow} />
          </marker>
          <marker id="hcd-orange" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={C.actuator.border} />
          </marker>
          <marker id="hcd-purple" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={C.feedback.border} />
          </marker>
        </defs>

        {/* ── Panel 1: host signal routing ─────────────────────────────── */}
        <rect x={20} y={16} width={920} height={300} rx={16} fill={NB.haloWhite} stroke={C.dark} strokeWidth={1.6} />
        <PanelBadge x={38} y={30} n="1" title="Host Signal Routing" w={252} />

        <DeviceBox x={60} y={120} w={210} h={110} cat={C.host} title="Jetson Orin Nano Super" titleSize={12} lines={['Host computer running', 'ROS 2 and your code']} />
        <DeviceBox x={640} y={84} w={280} h={64} cat={C.sensor} title="Richbeam LiDAR" lines={['Provides environmental', 'perception data']} />
        <DeviceBox x={640} y={164} w={280} h={64} cat={C.sensor} title="RGB Camera" lines={['Provides visual', 'perception data']} />
        <DeviceBox x={640} y={244} w={280} h={64} cat={C.sensor} title="Vehicle Controller" lines={['Provides chassis control', 'commands and status feedback']} />

        {/* LiDAR link */}
        <path d="M270 150H380V116H640" fill="none" stroke={C.arrow} strokeWidth={2} markerEnd="url(#hcd-blue)" />
        <text x={510} y={106} textAnchor="middle" style={{ ...mono, fontSize: 10 }} fill={C.dark}>USB 3.2 Downstream Port</text>
        <text x={510} y={131} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.arrow}>Perception Data</text>

        {/* Camera link */}
        <path d="M270 196H640" fill="none" stroke={C.arrow} strokeWidth={2} markerEnd="url(#hcd-blue)" />
        <text x={455} y={185} textAnchor="middle" style={{ ...mono, fontSize: 10 }} fill={C.dark}>USB 3.2 Downstream Port</text>
        <text x={455} y={210} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.arrow}>Perception Data</text>

        {/* Vehicle controller link — two-way */}
        <path d="M270 212H380V276H640" fill="none" stroke={C.arrow} strokeWidth={2} markerEnd="url(#hcd-blue)" markerStart="url(#hcd-blue)" />
        <text x={510} y={265} textAnchor="middle" style={{ ...mono, fontSize: 10 }} fill={C.dark}>USB 3.2 Downstream Port</text>
        <text x={452} y={290} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.arrow}>Control Commands</text>
        <text x={575} y={290} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.green}>Status Feedback</text>

        {/* ── Panel 2: controller signal routing ───────────────────────── */}
        <rect x={20} y={332} width={920} height={280} rx={16} fill={NB.haloWhite} stroke={C.dark} strokeWidth={1.6} />
        <PanelBadge x={38} y={346} n="2" title="Controller Signal Routing" w={294} />

        <DeviceBox x={400} y={410} w={160} h={160} cat={C.host} title="Vehicle" titleSize={12.5} lines={[]} />
        <text x={480} y={456} textAnchor="middle" style={{ ...mono, fontSize: 12.5 }} fill={C.host.text}>Controller</text>
        <text x={480} y={476} textAnchor="middle" style={{ ...body, fontSize: 9.5 }} fill={C.dark}>Real-time chassis</text>
        <text x={480} y={489} textAnchor="middle" style={{ ...body, fontSize: 9.5 }} fill={C.dark}>control MCU</text>

        <DeviceBox x={60} y={400} w={210} h={70} cat={C.actuator} title="ESC" lines={['Motor drive and', 'speed control']} />
        <DeviceBox x={60} y={500} w={210} h={70} cat={C.actuator} title="SERVO" lines={['Steering angle', 'control']} />
        <DeviceBox x={690} y={400} w={230} h={70} cat={C.feedback} title="ENC Encoder" lines={['Motor speed and mileage', 'data acquisition']} />
        <DeviceBox x={690} y={500} w={230} h={70} cat={C.feedback} title="2.4G RF Receiver" lines={['Receives remote controller', 'commands (RC mode)']} />

        {/* Controller → ESC */}
        <path d="M400 435H270" fill="none" stroke={C.actuator.border} strokeWidth={2} markerEnd="url(#hcd-orange)" />
        <text x={335} y={424} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.dark}>I/O (PWM Output)</text>
        <text x={335} y={451} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.actuator.border}>Control</text>

        {/* Controller → Servo */}
        <path d="M400 535H270" fill="none" stroke={C.actuator.border} strokeWidth={2} markerEnd="url(#hcd-orange)" />
        <text x={335} y={524} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.dark}>I/O (PWM Output)</text>
        <text x={335} y={551} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.actuator.border}>Control</text>

        {/* Encoder → controller */}
        <path d="M690 435H560" fill="none" stroke={C.feedback.border} strokeWidth={2} markerEnd="url(#hcd-purple)" />
        <text x={625} y={424} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.dark}>I/O (Pulse Input)</text>
        <text x={625} y={451} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.green}>Status Feedback</text>

        {/* RF receiver → controller */}
        <path d="M690 535H560" fill="none" stroke={C.feedback.border} strokeWidth={2} markerEnd="url(#hcd-purple)" />
        <text x={625} y={524} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.dark}>I/O (PPM Signal)</text>
        <text x={625} y={551} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={C.arrow}>Command Input</text>

        {/* ── Legend ───────────────────────────────────────────────────── */}
        {([
          [40, C.host, 'Host / Core Control'],
          [200, C.sensor, 'Sensors / Perception'],
          [370, C.actuator, 'Actuators / Output'],
          [525, C.feedback, 'Feedback / Input'],
        ] as [number, { border: string; fill: string }, string][]).map(([x, cat, label]) => (
          <g key={label}>
            <rect x={x} y={646} width={14} height={14} rx={4} fill={cat.fill} stroke={cat.border} strokeWidth={1.6} />
            <text x={x + 21} y={653} dominantBaseline="central" style={{ ...body, fontSize: 10 }} fill={C.dark}>
              {label}
            </text>
          </g>
        ))}
        <path d="M672 653H706" fill="none" stroke={C.arrow} strokeWidth={2} markerEnd="url(#hcd-blue)" />
        <text x={713} y={653} dominantBaseline="central" style={{ ...body, fontSize: 10 }} fill={C.dark}>One-way</text>
        <path d="M792 653H826" fill="none" stroke={C.arrow} strokeWidth={2} markerEnd="url(#hcd-blue)" markerStart="url(#hcd-blue)" />
        <text x={833} y={653} dominantBaseline="central" style={{ ...body, fontSize: 10 }} fill={C.dark}>Two-way</text>
      </svg>
    </div>
  );
}
