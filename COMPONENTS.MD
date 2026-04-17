USE THIS COMPONENTS IF NEEDED 


You are given a task to integrate a React component into your codebase.
Please verify your project has the following setup:
- shadcn/ui project structure
- Tailwind CSS v4.0
- TypeScript

If any of these are missing, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
File location: components/text-flipping-board-demo.tsx

File content: "use client";
import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES: string[] = [
  "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
  "What did you get done this week?",
  "I burned $20 \nfor this shit.",
  "DONT WORRY \nBE HAPPY FFS.",
  "LADIES AND GENTLEMEN \nWELCOME TO F#!@# C!@$",
];

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}


File location: components/ui/text-flipping-board.tsx

File content: "use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

const BOARD_ROWS = 6;
const BOARD_COLS = 22;

const BASE_COL_DELAY = 30;
const BASE_ROW_DELAY = 20;
const BASE_STEP_MS = 55;
const BASE_FLIP_S = 0.35;
const BASE_TOTAL_S =
  ((BOARD_COLS - 1) * BASE_COL_DELAY +
    (BOARD_ROWS - 1) * BASE_ROW_DELAY +
    8 * BASE_STEP_MS) /
  1000;

type AccentColor = {
  top: string;
  bottom: string;
  text: string;
};

const ACCENT_COLORS: AccentColor[] = [
  { top: "bg-red-600", bottom: "bg-red-700", text: "text-white" },
  { top: "bg-orange-500", bottom: "bg-orange-600", text: "text-white" },
  { top: "bg-yellow-400", bottom: "bg-yellow-500", text: "text-neutral-900" },
  { top: "bg-green-600", bottom: "bg-green-700", text: "text-white" },
  { top: "bg-blue-600", bottom: "bg-blue-700", text: "text-white" },
  { top: "bg-violet-600", bottom: "bg-violet-700", text: "text-white" },
  { top: "bg-white", bottom: "bg-neutral-100", text: "text-neutral-900" },
];

const CELL_TEXT_STYLE: React.CSSProperties = {
  fontSize: "clamp(6px, 2vw, 22px)",
  lineHeight: 1,
};

// ── Individual Split-Flap Character ───────────────────────────────────

const FlapCell = React.memo(function FlapCell({
  target,
  delay,
  stepMs,
  flipDuration,
}: {
  target: string;
  delay: number;
  stepMs: number;
  flipDuration: number;
}) {
  const [current, setCurrent] = useState(" ");
  const [prev, setPrev] = useState(" ");
  const [flipId, setFlipId] = useState(0);
  const [accent, setAccent] = useState<AccentColor | null>(null);
  const [prevAccent, setPrevAccent] = useState<AccentColor | null>(null);
  const curRef = useRef(" ");
  const tgtRef = useRef<string | null>(null);
  const accentRef = useRef<AccentColor | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (startTimer.current) clearTimeout(startTimer.current);
    if (stepTimer.current) clearTimeout(stepTimer.current);
    startTimer.current = null;
    stepTimer.current = null;

    const normalized = FLAP_CHARS.includes(target.toUpperCase())
      ? target.toUpperCase()
      : " ";
    if (normalized === tgtRef.current) return;
    tgtRef.current = normalized;

    if (normalized === " " && curRef.current === " ") return;

    const scrambleCount =
      normalized === " "
        ? 8 + Math.floor(Math.random() * 8)
        : 25 + Math.floor(Math.random() * 15);

    const runStep = (i: number) => {
      const isLast = i === scrambleCount;
      const ch = isLast
        ? normalized
        : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];

      const newAccent = isLast
        ? null
        : Math.random() < 0.2
          ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
          : null;

      setPrev(curRef.current);
      setPrevAccent(accentRef.current);
      curRef.current = ch;
      accentRef.current = newAccent;
      setCurrent(ch);
      setAccent(newAccent);
      setFlipId((n) => n + 1);

      if (!isLast) {
        stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
      }
    };

    startTimer.current = setTimeout(() => runStep(1), delay);

    return () => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;
      tgtRef.current = null;
    };
  }, [target, delay, stepMs]);

  const show = current === " " ? "\u00A0" : current;
  const showPrev = prev === " " ? "\u00A0" : prev;

  const textCx =
    "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide";
  const topBg = accent?.top ?? "bg-neutral-200/80 dark:bg-neutral-900";
  const bottomBg = accent?.bottom ?? "bg-neutral-200/80 dark:bg-neutral-900";
  const textColor = accent?.text ?? "text-neutral-800 dark:text-white";

  const flapTopBg = prevAccent?.top ?? "bg-neutral-100 dark:bg-neutral-800";
  const flapTextColor = prevAccent?.text ?? "text-neutral-800 dark:text-white";

  const bottomDelay = flipDuration * 0.5;

  return (
    <div className="flex aspect-3/6 flex-col overflow-hidden rounded-[2px] border border-neutral-300 md:rounded-[3px] md:border-2 dark:border-black">
      {/* Flap content area */}
      <div className="relative flex-1 perspective-dramatic transform-3d">
        <div className="absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex">
          <div className="h-1/2 w-px rounded-tr-sm rounded-br-sm bg-neutral-300 dark:bg-black" />
          <div className="flex h-px flex-1 bg-neutral-300 dark:bg-black" />
          <div className="h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-neutral-300 dark:bg-black" />
        </div>

        {/* Static top – new character top half */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]",
            topBg,
          )}
        >
          <div
            className={cn(textCx, textColor, "top-0 h-[200%]")}
            style={CELL_TEXT_STYLE}
          >
            {show}
          </div>
        </div>

        {/* Static bottom – new character bottom half */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]",
            bottomBg,
          )}
        >
          <div
            className={cn(textCx, textColor, "bottom-0 h-[200%]")}
            style={CELL_TEXT_STYLE}
          >
            {show}
          </div>
          {flipId > 0 && (
            <motion.div
              key={`s${flipId}`}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent_60%)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_60%)]"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: flipDuration * 1.3, ease: "easeOut" }}
            />
          )}
        </div>

        {/* Flipping top flap – old character top half, drops down */}
        {flipId > 0 && (
          <motion.div
            key={flipId}
            className={cn(
              "absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px] backface-hidden transform-3d",
              flapTopBg,
            )}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -100 }}
            transition={{
              duration: flipDuration,
              ease: [0.55, 0.055, 0.675, 0.19],
            }}
          >
            <div
              className={cn(textCx, flapTextColor, "top-0 h-[200%]")}
              style={CELL_TEXT_STYLE}
            >
              {showPrev}
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: flipDuration }}
            />
          </motion.div>
        )}

        {/* Flipping bottom flap – new character bottom half, rises up */}
        {flipId > 0 && (
          <motion.div
            key={`b${flipId}`}
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px] backface-hidden transform-3d",
              bottomBg,
            )}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{
              duration: flipDuration * 0.85,
              delay: bottomDelay,
              ease: [0.33, 1.55, 0.64, 1],
            }}
          >
            <div
              className={cn(textCx, textColor, "bottom-0 h-[200%]")}
              style={CELL_TEXT_STYLE}
            >
              {show}
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0),rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0),rgba(0,0,0,0.6))]"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: flipDuration * 0.85,
                delay: bottomDelay,
              }}
            />
          </motion.div>
        )}

        {/* Split line */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-neutral-400/50 dark:bg-black/50" />
      </div>

      {/* Bottom stripes – decorative, outside the flap area */}
      <div className="h-2 w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.15rem)] mask-t-from-50% text-neutral-400 opacity-20 md:h-4 md:bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.2rem)] dark:text-black dark:opacity-100" />
    </div>
  );
},
(prevProps, nextProps) =>
  prevProps.target === nextProps.target &&
  prevProps.delay === nextProps.delay &&
  prevProps.stepMs === nextProps.stepMs &&
  prevProps.flipDuration === nextProps.flipDuration,
);

// ── Color Tile ────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  "{R}": "#D32F2F",
  "{O}": "#F57C00",
  "{Y}": "#FBC02D",
  "{G}": "#43A047",
  "{B}": "#1E88E5",
  "{V}": "#8E24AA",
  "{W}": "#FAFAFA",
};

const ColorCell = React.memo(function ColorCell({ color }: { color: string }) {
  return (
    <div
      className="aspect-3/5 rounded-[3px] border-2 border-neutral-300 dark:border-black"
      style={{ backgroundColor: color }}
    />
  );
});

// ── Row Parser ────────────────────────────────────────────────────────

type ParsedCell =
  | { type: "char"; value: string }
  | { type: "color"; hex: string };

function parseRow(row: string): ParsedCell[] {
  const cells: ParsedCell[] = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}

// ── Word Wrap ─────────────────────────────────────────────────────────

function wrapParagraph(paragraph: string, maxCols: number): string[] {
  const lines: string[] = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";

  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }

    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

function wrapText(input: string, maxCols: number): string[] {
  return input
    .split("\n")
    .flatMap((paragraph) =>
      paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols),
    );
}

// ── Main TextFlippingBoard Component ──────────────────────────────────

export interface TextFlippingBoardProps {
  rows?: string[];
  text?: string;
  className?: string;
  /** Total animation duration in seconds. Defaults to ~1.2s. */
  duration?: number;
}

export function TextFlippingBoard({
  rows,
  text,
  className,
  duration = BASE_TOTAL_S,
}: TextFlippingBoardProps) {
  const scale = duration / BASE_TOTAL_S;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));

  const board = useMemo(() => {
    const grid: ParsedCell[][] = Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({
        type: "char" as const,
        value: " ",
      })),
    );

    if (text) {
      const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
      const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
      lines.forEach((line, i) => {
        const row = startRow + i;
        if (row >= BOARD_ROWS) return;
        const parsed = parseRow(line);
        const startCol = Math.max(
          0,
          Math.floor((BOARD_COLS - parsed.length) / 2),
        );
        parsed.forEach((cell, c) => {
          if (startCol + c < BOARD_COLS) {
            grid[row][startCol + c] = cell;
          }
        });
      });
    } else if (rows) {
      rows.forEach((row, r) => {
        if (r >= BOARD_ROWS) return;
        const parsed = parseRow(row);
        parsed.forEach((cell, c) => {
          if (c < BOARD_COLS) {
            grid[r][c] = cell;
          }
        });
      });
    }

    return grid;
  }, [rows, text]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-3xl rounded-xl bg-neutral-100 p-2 shadow-xl md:rounded-2xl md:p-4 dark:bg-neutral-900 dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div
        className="grid gap-px md:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) =>
            cell.type === "color" ? (
              <ColorCell key={`${r}-${c}`} color={cell.hex} />
            ) : (
              <FlapCell
                key={`${r}-${c}`}
                target={cell.value}
                delay={c * colDelay + r * rowDelay}
                stepMs={stepMs}
                flipDuration={flipDur}
              />
            ),
          ),
        )}
      </div>
    </div>
  );
}


COMP 2

"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
USE THIS FOR CARDS

COMP 3

import React from "react";
import { EvervaultCard, Icon } from "../ui/evervault-card";

export function EvervaultCardDemo() {
  return (
    <div
      className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon
        className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <EvervaultCard text="hover" />
      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        Hover over this card to reveal an awesome effect. Running out of copy
        here.
      </h2>
      <p
        className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        Watch me hover
      </p>
    </div>
  );
}


USE THIS  TOO

COPM 4

import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

USE THIS IF NEEDED

COMP 5

import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardDemo() {
  const items = [
    {
      title: "Tyler Durden",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer
      className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p
        className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        If its your first day at Fight Club, you have to fight.
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover" />
          <h3
            className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}


USE THIS AS DEPARTMENT CARDS 

COMP 7 

import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";

export function EncryptedTextDemoSecond() {
  return (
    <p className="mx-auto max-w-lg py-10 text-left">
      <EncryptedText
        text="Welcome to the Matrix, Neo."
        encryptedClassName="text-neutral-500"
        revealedClassName="dark:text-white text-black"
        revealDelayMs={50} />
    </p>
  );
}

USE THIS FOR SOMETHING

COMP 8
import React from "react";
import { LoaderOne } from "@/components/ui/loader";

export function LoaderOneDemo() {
  return <LoaderOne />;
}


USE THIS FOR LOADING 

COMP 10

import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";

export function SpotlightPreview() {
  return (
    <div
      className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )} />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p
          className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
      </div>
    </div>
  );
}

USE THIS FOR SPOTLIGHT EFFECT

COMP 11

import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p
            className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div
              className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Card grid component
            </div>
            <div
              className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Startup template Aceternity
            </div>
            <div
              className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Random file upload lol
            </div>
            <div
              className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div
              className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

USE SOME MOCK DATA FOR THIS

COMP 12

"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
  );
}

Typewriter Effect

Use for the tagline: "This is not a club. This is a platform."
Types out letter by letter after video ends

COMP 13

"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div
      className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1
          className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p
          className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700" />
      </div>
      <BackgroundBeams />
    </div>
  );
}

Background Beams

Use behind the Join Us form
Animated beam lines on dark background

COMP 14

"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative w-full translate-z-0">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    <div
      className="relative grid h-[40rem] w-full grid-cols-1 rounded-md border border-neutral-200 bg-white dark:border-white/[0.2] dark:bg-black">
      <p
        className="mt-40 text-center text-4xl font-bold text-neutral-600 dark:text-white">
        Scroll back up to reveal Navbar
      </p>
      <div className="bg-grid-black/[0.1] dark:bg-grid-white/[0.2] absolute inset-0" />
    </div>
  );
};


Navbar Menu

Aceternity has a floating navbar component
Cleaner than building from scratch