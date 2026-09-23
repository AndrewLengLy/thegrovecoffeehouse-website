"use client";

import { useDrawOnView } from "@/components/ui/useDrawOnView";

/**
 * Small red line drawings for the margins.
 *
 * Each one draws itself in, stroke by stroke, the first time it is on screen,
 * then keeps moving a little: steam rises, leaves sway, notes bob. They are
 * decoration and always hidden from assistive technology.
 *
 *   cup     a cup on a saucer with a sprout growing out of it
 *   drinks  an iced coffee and an espresso on a tray
 *   table   a bistro table for two, with a sprig in a vase
 *   guitar  a guitar and two notes, for music night
 *   sapling a little potted tree
 */

export type DoodleName = "cup" | "drinks" | "table" | "guitar" | "sapling";

type Stroke = { d: string; w?: number; cls?: string };

function Lines({ strokes, start = 0 }: { strokes: Stroke[]; start?: number }) {
  return (
    <>
      {strokes.map((s, i) => (
        <path
          key={i}
          className={`draw ${s.cls ?? ""}`}
          pathLength={1}
          style={{ ["--i" as string]: start + i }}
          d={s.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={s.w ?? 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}

function Fill({ d, opacity = 1 }: { d: string; opacity?: number }) {
  return <path className="fill-in" d={d} fill="currentColor" opacity={opacity} />;
}

function Cup() {
  return (
    <>
      <Lines
        strokes={[
          { d: "M30 139C52 146 108 146 130 139" },
          { d: "M44 136.5C62 133 98 133 116 136.5", w: 1.6 },
          { d: "M49 89C50 103 52 118 55 128C56.5 133 60 134.5 66 134.5H95C100.5 134.5 104 133 105.5 128C108 118 110 103 111 89" },
          { d: "M49 89C60 95 100 95 111 89C100 84 60 84 49 89Z" },
          { d: "M110 98C124 95 128 115 106 121" },
          { d: "M53 108C68 111.5 92 111.5 107 108", w: 1.4 },
        ]}
      />
      <g className="sway">
        <Lines
          start={6}
          strokes={[
            { d: "M80 91C79 80 82 70 80 58C79 52 80 47 81 43" },
            { d: "M80.5 67C72 66 63 60 59 50C68 49 77 55 80.5 66" },
            { d: "M80.5 57C86 49 95 44 106 43C103 53 93 59 81 58" },
            { d: "M79.5 65C73 61 67 56 62.5 52", w: 1.2 },
            { d: "M81.5 57C88 52 95 48 102.5 45.5", w: 1.2 },
          ]}
        />
        <Fill d="M84 40a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z" />
      </g>
      <g className="rise">
        <Lines start={11} strokes={[{ d: "M63 78C58 71 67 67 62 60", w: 1.8 }]} />
      </g>
      <g className="rise-late">
        <Lines start={12} strokes={[{ d: "M98 78C93 71 102 67 97 60", w: 1.8 }]} />
      </g>
    </>
  );
}

function Drinks() {
  return (
    <>
      <Fill
        opacity={0.2}
        d="M42 95C52 98 70 98 81 95L77 127C76.5 130 74.5 131 72 131H51C48.5 131 46.5 130 46 127Z"
      />
      <Lines
        strokes={[
          { d: "M14 134C40 144 120 144 146 134C132 127 28 127 14 134Z" },
          { d: "M38 62L46 127C46.5 130 48.5 131 51 131H72C74.5 131 76.5 130 77 127L85 62" },
          { d: "M34 62H89" },
          { d: "M37 62C40 52 83 52 86 62" },
          { d: "M65 55L72 22L82 20" },
          { d: "M42 95C52 98 70 98 81 95", w: 1.6 },
          { d: "M50 72L60 69L63 79L53 82Z", w: 1.5 },
          { d: "M64 82L73 84L71 93L62 91Z", w: 1.5 },
          { d: "M96 106C96.5 119 102 128 113 128C124 128 129.5 119 130 106Z" },
          { d: "M129.5 110C139 109 140 121 127 121" },
          { d: "M90 130C104 134 124 134 138 130", w: 1.6 },
        ]}
      />
      <g className="rise">
        <Lines start={11} strokes={[{ d: "M107 98C103 92 111 88 107 81", w: 1.8 }]} />
      </g>
      <g className="rise-late">
        <Lines start={12} strokes={[{ d: "M119 98C115 92 123 88 119 81", w: 1.8 }]} />
      </g>
    </>
  );
}

function Table() {
  return (
    <>
      <Lines
        strokes={[
          { d: "M44 92C58 99 102 99 116 92C102 86 58 86 44 92Z" },
          { d: "M80 98V139" },
          { d: "M64 143C72 139 88 139 96 143" },
          { d: "M28 58C20 70 20 92 28 106" },
          { d: "M28 64C36 68 37 88 31 99", w: 1.6 },
          { d: "M26 106C34 109 46 110 54 108" },
          { d: "M29 108L23 144" },
          { d: "M52 109L57 144" },
          { d: "M132 58C140 70 140 92 132 106" },
          { d: "M132 64C124 68 123 88 129 99", w: 1.6 },
          { d: "M134 106C126 109 114 110 106 108" },
          { d: "M131 108L137 144" },
          { d: "M108 109L103 144" },
          { d: "M76 90C72 84 73 77 77 74H83C87 77 88 84 84 90" },
          { d: "M56 90L57.5 82H66.5L68 90" },
          { d: "M57 84C53 84 53 88 56.5 88", w: 1.5 },
          { d: "M92 90L93.5 82H102.5L104 90" },
          { d: "M103 84C107 84 107 88 103.5 88", w: 1.5 },
        ]}
      />
      <g className="sway">
        <Lines
          start={18}
          strokes={[
            { d: "M80 74C79 64 76 57 71 51", w: 1.8 },
            { d: "M80 74C81 62 86 55 92 50", w: 1.8 },
            { d: "M80 74V52", w: 1.8 },
          ]}
        />
        <Fill d="M73.5 50a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0Z" />
        <Fill d="M94.5 49a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0Z" />
        <Fill d="M82.5 50a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0Z" />
      </g>
      <g className="rise">
        <Lines start={21} strokes={[{ d: "M98 78C95 74 101 71 98 67", w: 1.6 }]} />
      </g>
    </>
  );
}

function Guitar() {
  return (
    <>
      <g transform="rotate(-14 80 100)">
        <Lines
          strokes={[
            { d: "M80 150C54 150 46 130 57 118C63 112 62 106 60 100C56 86 67 77 80 77C93 77 104 86 100 100C98 106 97 112 103 118C114 130 106 150 80 150Z" },
            { d: "M89 113A9 9 0 1 1 71 113A9 9 0 1 1 89 113Z" },
            { d: "M70 134H90" },
            { d: "M76 78V32" },
            { d: "M84 78V32" },
            { d: "M76 44H84M76 54H84M76 64H84", w: 1.3 },
            { d: "M75 32L73 16H87L85 32Z" },
            { d: "M73 20H69M73 27H69M87 20H91M87 27H91", w: 1.6 },
            { d: "M78.5 134V18M81.5 134V18", w: 0.9 },
          ]}
        />
      </g>
      <g className="bob">
        <Lines start={9} strokes={[{ d: "M125 70V46C130 48 134 50 134 57", w: 1.8 }]} />
        <Fill d="M126 70C126 73 122 75 119 74C116 73 116 70 119 68C122 66 126 67 126 70Z" />
      </g>
      <g className="bob-late">
        <Lines start={10} strokes={[{ d: "M36 60V40L48 36V56", w: 1.8 }]} />
        <Fill d="M36 60C36 63 32 65 29 64C26 63 27 60 29 58.5C32 57 36 57.5 36 60Z" />
        <Fill d="M48 56C48 59 44 61 41 60C38 59 39 56 41 54.5C44 53 48 53.5 48 56Z" />
      </g>
    </>
  );
}

function Sapling() {
  return (
    <>
      <Lines
        strokes={[
          { d: "M58 110H102L100 118H60Z" },
          { d: "M61 118L65 150H95L99 118" },
          { d: "M80 110C80 96 78 86 80 72" },
          { d: "M80 93C74 89 70 85 68 79", w: 1.6 },
          { d: "M80 87C86 83 90 79 92 73", w: 1.6 },
        ]}
      />
      <g className="sway">
        <Lines
          start={5}
          strokes={[
            { d: "M80 76C66 78 56 70 58 60C50 56 52 44 62 42C62 32 74 26 82 32C90 24 104 30 102 40C112 42 112 56 104 60C106 70 94 78 80 76Z" },
            { d: "M69 53C71 51 74 51 76 53", w: 1.4 },
            { d: "M86 45C88 43 91 43 93 45", w: 1.4 },
            { d: "M84 63C86 61 89 61 91 63", w: 1.4 },
          ]}
        />
      </g>
    </>
  );
}

const DRAWINGS: Record<DoodleName, () => React.JSX.Element> = {
  cup: Cup,
  drinks: Drinks,
  table: Table,
  guitar: Guitar,
  sapling: Sapling,
};

export function Doodle({ name, className = "" }: { name: DoodleName; className?: string }) {
  const ref = useDrawOnView<SVGSVGElement>();
  const Drawing = DRAWINGS[name];

  return (
    <svg
      ref={ref}
      data-draw
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
      overflow="visible"
      className={`pointer-events-none text-doodle ${className}`}
    >
      <Drawing />
    </svg>
  );
}
