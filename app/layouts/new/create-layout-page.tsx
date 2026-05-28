"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, HelpCircle, ImageIcon, Plus, Trash2, Type } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TemplateId = "two-zone-vertical" | "two-zone-horizontal" | "five-zone";
type WidgetType = "scrolling-text" | "rotating-text" | "image";
type ClockWeatherScheme = "blue" | "black" | "white";
type Step = 1 | 2 | 3;

// ─── SVG diagrams ────────────────────────────────────────────────────────────

const twoZoneVerticalDiagram = (
  <svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="0" y="0" width="160" height="72" fill="#e2e8f0" rx="2" />
    <text x="80" y="36" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Content</text>
    <rect x="0" y="74" width="160" height="16" fill="#cbd5e1" rx="2" />
    <text x="80" y="82" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Ticker</text>
  </svg>
);

const twoZoneHorizontalDiagram = (
  <svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="0" y="0" width="105" height="90" fill="#e2e8f0" rx="2" />
    <text x="52" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Content</text>
    <rect x="107" y="0" width="53" height="90" fill="#cbd5e1" rx="2" />
    <text x="133" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Side</text>
  </svg>
);

const fiveZoneDiagram = (
  <svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="0" y="0" width="105" height="62" fill="#e2e8f0" rx="2" />
    <text x="52" y="31" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Content</text>
    <rect x="107" y="0" width="53" height="28" fill="#cbd5e1" rx="2" />
    <text x="133" y="14" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Clock</text>
    <rect x="107" y="30" width="53" height="30" fill="#bfdbfe" rx="2" />
    <text x="133" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Weather</text>
    <rect x="0" y="64" width="105" height="26" fill="#ddd6fe" rx="2" />
    <text x="52" y="77" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Ticker</text>
    <rect x="107" y="62" width="53" height="28" fill="#fde68a" rx="2" />
    <text x="133" y="76" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontFamily="sans-serif">Image</text>
  </svg>
);

// ─── Template definitions ─────────────────────────────────────────────────────

interface Template {
  id: TemplateId;
  name: string;
  description: string;
  diagram: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "two-zone-vertical",
    name: "Two Zone Vertical",
    description: "Main content area with a ticker bar along the bottom. Content will be letterboxed.",
    diagram: twoZoneVerticalDiagram,
  },
  {
    id: "two-zone-horizontal",
    name: "Two Zone Horizontal",
    description: "Content on the left with a configurable widget column on the right. Content will be letterboxed.",
    diagram: twoZoneHorizontalDiagram,
  },
  {
    id: "five-zone",
    name: "5 Zone",
    description: "Rich layout with dedicated zones for content, clock, weather, ticker, and image. Content will be letterboxed.",
    diagram: fiveZoneDiagram,
  },
];

// ─── Widget definitions ───────────────────────────────────────────────────────

interface WidgetOption {
  id: WidgetType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const widgetOptions: WidgetOption[] = [
  {
    id: "scrolling-text",
    name: "Scrolling Text",
    description: "A single line of text that scrolls continuously.",
    icon: <Type className="size-5 text-muted-foreground" />,
  },
  {
    id: "rotating-text",
    name: "Rotating Text",
    description: "3–4 text banners that rotate automatically on a timer.",
    icon: (
      <svg viewBox="0 0 20 20" className="size-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="16" height="5" rx="1" />
        <rect x="2" y="11" width="16" height="5" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "image",
    name: "Image / Rotating Images",
    description: "Display 1–4 images that rotate automatically.",
    icon: <ImageIcon className="size-5 text-muted-foreground" />,
  },
];

// ─── Step indicator ───────────────────────────────────────────────────────────

const stepLabels: Record<Step, string> = { 1: "Template", 2: "Configure", 3: "Details" };

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center">
      {([1, 2, 3] as Step[]).map((n, i) => (
        <React.Fragment key={n}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                current === n
                  ? "bg-primary text-primary-foreground"
                  : current > n
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {n}
            </div>
            <span className={cn("text-xs", current >= n ? "text-foreground font-medium" : "text-muted-foreground")}>
              {stepLabels[n]}
            </span>
          </div>
          {i < 2 && (
            <div className={cn("h-px w-16 mb-4 mx-2 transition-colors", current > n ? "bg-primary/40" : "bg-border")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ColorPicker({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="size-8 rounded border border-input overflow-hidden cursor-pointer shrink-0"
          style={{ backgroundColor: value }}
        >
          <input
            id={id}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <span className="text-sm text-muted-foreground font-mono">{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

// ─── Widget config forms (controlled) ────────────────────────────────────────

const SCROLL_TEXT_LIMIT = 150;
const ROTATE_PANEL_LIMIT = 30;
const FONT_OPTIONS = ["Arial", "Helvetica"];

function FontSelector({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>Font</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONT_OPTIONS.map((f) => (
            <SelectItem key={f} value={f}>{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface ScrollingTextProps {
  text: string; onTextChange: (v: string) => void;
  bgColor: string; onBgColorChange: (v: string) => void;
  textColor: string; onTextColorChange: (v: string) => void;
  font: string; onFontChange: (v: string) => void;
}

function ScrollingTextConfig({ text, onTextChange, bgColor, onBgColorChange, textColor, onTextColorChange, font, onFontChange }: ScrollingTextProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="scroll-text">Text</Label>
          <span className={cn("text-xs tabular-nums", text.length > SCROLL_TEXT_LIMIT ? "text-destructive" : "text-muted-foreground")}>
            {text.length}/{SCROLL_TEXT_LIMIT}
          </span>
        </div>
        <Input
          id="scroll-text"
          value={text}
          onChange={(e) => onTextChange(e.target.value.slice(0, SCROLL_TEXT_LIMIT))}
          placeholder="Enter scrolling text..."
          maxLength={SCROLL_TEXT_LIMIT}
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <ColorPicker id="scroll-bg" label="Background Color" value={bgColor} onChange={onBgColorChange} />
        <ColorPicker id="scroll-text-color" label="Text Color" value={textColor} onChange={onTextColorChange} />
        <FontSelector id="scroll-font" value={font} onChange={onFontChange} />
      </div>
      {text && (
        <div className="flex flex-col gap-1">
          <div
            className="rounded px-3 py-2 text-sm font-medium truncate"
            style={{ backgroundColor: bgColor, color: textColor, fontFamily: font }}
          >
            {text}
          </div>
          <p className="text-xs text-muted-foreground">The preview is for color and font confirmation — the size will be much larger on screen.</p>
        </div>
      )}
    </div>
  );
}

interface RotatingTextProps {
  panels: string[]; onPanelsChange: (v: string[]) => void;
  bgColor: string; onBgColorChange: (v: string) => void;
  textColor: string; onTextColorChange: (v: string) => void;
  font: string; onFontChange: (v: string) => void;
}

const ROTATE_INTERVAL = 4000;
const FADE_DURATION = 600;

function RotatingTextConfig({ panels, onPanelsChange, bgColor, onBgColorChange, textColor, onTextColorChange, font, onFontChange }: RotatingTextProps) {
  const filledPanels = panels.filter((p) => p.trim() !== "");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (filledPanels.length < 2) {
      setVisible(true);
      return;
    }
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % filledPanels.length);
        setVisible(true);
      }, FADE_DURATION);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [filledPanels.length]);

  // Keep activeIndex in bounds if panels shrink
  React.useEffect(() => {
    if (filledPanels.length > 0 && activeIndex >= filledPanels.length) {
      setActiveIndex(0);
    }
  }, [filledPanels.length, activeIndex]);

  function updatePanel(index: number, value: string) {
    onPanelsChange(panels.map((p, i) => (i === index ? value.slice(0, ROTATE_PANEL_LIMIT) : p)));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Banners</Label>
        <div className="flex flex-col gap-2">
          {panels.map((panel, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-6 shrink-0 text-right">{index + 1}.</span>
              <div className="flex-1 flex flex-col gap-0.5">
                <Input
                  value={panel}
                  onChange={(e) => updatePanel(index, e.target.value)}
                  placeholder={`Banner ${index + 1} text...`}
                  maxLength={ROTATE_PANEL_LIMIT}
                />
                <span className={cn("text-xs tabular-nums self-end", panel.length >= ROTATE_PANEL_LIMIT ? "text-destructive" : "text-muted-foreground")}>
                  {panel.length}/{ROTATE_PANEL_LIMIT}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <ColorPicker id="rotate-bg" label="Background Color" value={bgColor} onChange={onBgColorChange} />
        <ColorPicker id="rotate-text-color" label="Text Color" value={textColor} onChange={onTextColorChange} />
        <FontSelector id="rotate-font" value={font} onChange={onFontChange} />
      </div>
      {filledPanels.length > 0 && (
        <div className="flex flex-col gap-1">
          <div
            className="rounded px-3 py-2 text-sm font-medium truncate transition-opacity text-center"
            style={{ backgroundColor: bgColor, color: textColor, fontFamily: font, opacity: visible ? 1 : 0, transitionDuration: `${FADE_DURATION}ms` }}
          >
            {filledPanels[activeIndex]}
          </div>
          <p className="text-xs text-muted-foreground">The preview is for color and font confirmation — the size will be much larger on screen.</p>
        </div>
      )}
    </div>
  );
}

interface ImageSpec {
  recommendedSize: string;
  aspectClass: string; // Tailwind aspect-ratio class
  cols: 2 | 4;
}

const PORTRAIT_IMAGE_SPEC: ImageSpec = {
  recommendedSize: "540 × 1920px",
  aspectClass: "aspect-[9/16]",
  cols: 4,
};

const LANDSCAPE_TICKER_SPECS: Record<string, ImageSpec> = {
  "two-zone-vertical": { recommendedSize: "1920 × 170px", aspectClass: "aspect-[4/1]", cols: 2 },
  "five-zone":         { recommendedSize: "1404 × 170px", aspectClass: "aspect-[4/1]", cols: 2 },
};

const RIGHT_ZONE_IMAGE_SPEC: ImageSpec = {
  recommendedSize: "450 × 1080px",
  aspectClass: "aspect-[5/12]",
  cols: 4,
};

interface ImageWidgetProps {
  images: (File | null)[];
  onImagesChange: (v: (File | null)[]) => void;
  spec?: ImageSpec;
}

function ImageWidgetConfig({ images, onImagesChange, spec = PORTRAIT_IMAGE_SPEC }: ImageWidgetProps) {
  const inputRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  const gridClass = spec.cols === 2 ? "grid-cols-2" : "grid-cols-4";

  function handleFileChange(index: number, file: File | null) {
    const next = [...images];
    next[index] = file;
    if (file && index === next.length - 1 && next.length < 4) next.push(null);
    onImagesChange(next);
  }

  function removeImage(index: number) {
    const next = images.filter((_, i) => i !== index);
    onImagesChange(next.length === 0 ? [null] : next);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label>Images</Label>
        <p className="text-xs text-muted-foreground">Upload 1–4 images. Recommended size: {spec.recommendedSize}.</p>
      </div>
      <div className={cn("grid gap-3", gridClass)}>
        {images.map((file, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <input
              ref={inputRefs[index]}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileChange(index, e.target.files?.[0] ?? null)}
            />
            {file ? (
              <div className={cn("relative rounded-md border overflow-hidden bg-muted group", spec.aspectClass)}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => inputRefs[index].current?.click()}
                className={cn(
                  "rounded-md border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-1",
                  spec.aspectClass
                )}
              >
                <Plus className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Clock & weather color scheme ────────────────────────────────────────────

const CLOCK_WEATHER_SCHEMES: Record<ClockWeatherScheme, { label: string; bg: string; cardBg: string; text: string }> = {
  blue:  { label: "Blue",  bg: "#022649", cardBg: "rgba(30,64,175,0.5)", text: "#ffffff" },
  black: { label: "Black", bg: "#000000", cardBg: "#4b5563",              text: "#ffffff" },
  white: { label: "White", bg: "#ffffff", cardBg: "#e5e7eb",              text: "#000000" },
};

function ClockWeatherSchemeSelector({ value, onChange }: { value: ClockWeatherScheme; onChange: (v: ClockWeatherScheme) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium">Clock & Weather Color Scheme</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                <HelpCircle className="size-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-64">
              Make sure your screens are set to the correct timezones. This can be done in screen details.
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xs text-muted-foreground">Choose a color scheme for the clock and weather zones.</p>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-sm">
        {(Object.entries(CLOCK_WEATHER_SCHEMES) as [ClockWeatherScheme, typeof CLOCK_WEATHER_SCHEMES[ClockWeatherScheme]][]).map(([id, scheme]) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col gap-2 rounded-lg border-2 p-3 text-left transition-colors",
              value === id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40"
            )}
          >
            <div className="w-full rounded overflow-hidden flex flex-col p-2 gap-2" style={{ backgroundColor: scheme.bg }}>
              <div className="flex items-center justify-center gap-1" style={{ color: scheme.text }}>
                <span style={{ fontSize: 13, fontWeight: 300, letterSpacing: 1 }}>12:00</span>
                <span style={{ fontSize: 7, opacity: 0.75 }}>PM</span>
              </div>
              <div className="flex flex-col items-center gap-1" style={{ color: scheme.text }}>
                <span style={{ fontSize: 16 }}>⛅</span>
                <span style={{ fontSize: 9 }}>72°F</span>
                <div className="grid grid-cols-4 gap-0.5 w-full mt-0.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{ backgroundColor: scheme.cardBg, borderRadius: 2, height: 8 }} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs font-semibold">{scheme.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Five Zone single image upload ───────────────────────────────────────────

const FIVE_ZONE_IMAGE_SPEC: ImageSpec = {
  recommendedSize: "450 × 170px",
  aspectClass: "aspect-[45/17]",
  cols: 2,
};

function FiveZoneImageUpload({ image, onImageChange }: { image: File | null; onImageChange: (f: File | null) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dimensionWarning, setDimensionWarning] = React.useState(false);

  function handleFileSelect(file: File | null) {
    setDimensionWarning(false);
    onImageChange(file);
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth !== 450 || img.naturalHeight !== 170) setDimensionWarning(true);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
      />
      {image ? (
        <div className={cn("relative rounded-md border overflow-hidden bg-muted group w-48", FIVE_ZONE_IMAGE_SPEC.aspectClass)}>
          <img
            src={URL.createObjectURL(image)}
            alt="Image zone"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => { onImageChange(null); setDimensionWarning(false); }}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "rounded-md border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-1 w-48",
            FIVE_ZONE_IMAGE_SPEC.aspectClass
          )}
        >
          <Plus className="size-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Upload image</span>
        </button>
      )}
      {dimensionWarning && (
        <div className="flex gap-3 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2.5 text-sm text-yellow-800 max-w-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>This image is not 450 × 170px and may appear stretched or cropped in the image zone. You can still use it or choose a different file.</span>
        </div>
      )}
    </div>
  );
}

// ─── Widget zone selector (step 2) ───────────────────────────────────────────

interface WidgetZoneProps {
  label: string;
  description: string;
  selectedWidget: WidgetType | null;
  onSelectWidget: (w: WidgetType) => void;
  // scrolling text
  scrollText: string; onScrollText: (v: string) => void;
  scrollBg: string; onScrollBg: (v: string) => void;
  scrollTextColor: string; onScrollTextColor: (v: string) => void;
  scrollFont: string; onScrollFont: (v: string) => void;
  // rotating text
  rotatePanels: string[]; onRotatePanels: (v: string[]) => void;
  rotateBg: string; onRotateBg: (v: string) => void;
  rotateTextColor: string; onRotateTextColor: (v: string) => void;
  rotateFont: string; onRotateFont: (v: string) => void;
  // images
  images: (File | null)[]; onImages: (v: (File | null)[]) => void;
  imageSpec?: ImageSpec;
}

function WidgetZoneConfig(props: WidgetZoneProps) {
  const { label, description, selectedWidget, onSelectWidget } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {widgetOptions.filter((w) => w.id !== "scrolling-text").map((widget) => {
          const isSelected = selectedWidget === widget.id;
          return (
            <button
              key={widget.id}
              type="button"
              onClick={() => onSelectWidget(widget.id)}
              className={cn(
                "flex flex-col gap-2 rounded-lg border-2 p-3 text-left transition-colors",
                isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40"
              )}
            >
              {widget.icon}
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold leading-tight">{widget.name}</p>
                <p className="text-xs text-muted-foreground leading-snug">{widget.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedWidget === "scrolling-text" && (
        <ScrollingTextConfig
          text={props.scrollText} onTextChange={props.onScrollText}
          bgColor={props.scrollBg} onBgColorChange={props.onScrollBg}
          textColor={props.scrollTextColor} onTextColorChange={props.onScrollTextColor}
          font={props.scrollFont} onFontChange={props.onScrollFont}
        />
      )}
      {selectedWidget === "rotating-text" && (
        <RotatingTextConfig
          panels={props.rotatePanels} onPanelsChange={props.onRotatePanels}
          bgColor={props.rotateBg} onBgColorChange={props.onRotateBg}
          textColor={props.rotateTextColor} onTextColorChange={props.onRotateTextColor}
          font={props.rotateFont} onFontChange={props.onRotateFont}
        />
      )}
      {selectedWidget === "image" && (
        <ImageWidgetConfig images={props.images} onImagesChange={props.onImages} spec={props.imageSpec} />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function CreateLayoutPage() {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [step, setStep] = React.useState<Step>(1);

  // Step 1
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateId | null>(null);

  // Step 2 — widget
  const [clockWeatherScheme, setClockWeatherScheme] = React.useState<ClockWeatherScheme>("blue");
  const [selectedWidget, setSelectedWidget] = React.useState<WidgetType | null>(null);
  const [scrollText, setScrollText] = React.useState("");
  const [scrollBg, setScrollBg] = React.useState("#000000");
  const [scrollTextColor, setScrollTextColor] = React.useState("#ffffff");
  const [scrollFont, setScrollFont] = React.useState("Arial");
  const [rotatePanels, setRotatePanels] = React.useState(["", "", "", ""]);
  const [rotateBg, setRotateBg] = React.useState("#000000");
  const [rotateTextColor, setRotateTextColor] = React.useState("#ffffff");
  const [rotateFont, setRotateFont] = React.useState("Arial");
  const [images, setImages] = React.useState<(File | null)[]>([null]);
  const [fiveZoneImage, setFiveZoneImage] = React.useState<File | null>(null);

  // Step 3
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const widgetProps = {
    selectedWidget, onSelectWidget: setSelectedWidget,
    scrollText, onScrollText: setScrollText,
    scrollBg, onScrollBg: setScrollBg,
    scrollTextColor, onScrollTextColor: setScrollTextColor,
    scrollFont, onScrollFont: setScrollFont,
    rotatePanels, onRotatePanels: setRotatePanels,
    rotateBg, onRotateBg: setRotateBg,
    rotateTextColor, onRotateTextColor: setRotateTextColor,
    rotateFont, onRotateFont: setRotateFont,
    images, onImages: setImages,
  };

  async function uploadImages(files: File[]): Promise<string[]> {
    return Promise.all(
      files.map(async (file) => {
        const { uploadUrl, s3Url } = await fetch("/api/content/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }).then((r) => r.json());

        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            url: s3Url,
            mimeType: file.type,
            type: "layout_content",
          }),
        });

        return s3Url as string;
      })
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const nonNullImages = images.filter((f): f is File => f !== null);
      const imageUrls = nonNullImages.length > 0 ? await uploadImages(nonNullImages) : [];

      let fiveZoneImageUrl: string | null = null;
      if (fiveZoneImage) {
        [fiveZoneImageUrl] = await uploadImages([fiveZoneImage]);
      }

      const zone_data: object[] = [];

      if (selectedTemplate === "two-zone-vertical" || selectedTemplate === "two-zone-horizontal") {
        // Zone 1
        const zoneNum = 1;
        if (selectedTemplate === "two-zone-horizontal") {
          zone_data.push({ zone: zoneNum, widget_type: "rotating-image", images: imageUrls });
        } else {
          // two-zone-vertical: ticker zone, widget chosen by user
          if (selectedWidget === "scrolling-text") {
            zone_data.push({
              zone: zoneNum,
              widget_type: "ticker",
              text: [scrollText],
              background_color: scrollBg,
              text_color: scrollTextColor,
              font: scrollFont,
            });
          } else if (selectedWidget === "rotating-text") {
            zone_data.push({
              zone: zoneNum,
              widget_type: "rotating-banner",
              text: rotatePanels.filter((p) => p.trim() !== ""),
              background_color: rotateBg,
              text_color: rotateTextColor,
              font: rotateFont,
            });
          } else if (selectedWidget === "image") {
            zone_data.push({ zone: zoneNum, widget_type: "rotating-image", images: imageUrls });
          }
        }
      } else if (selectedTemplate === "five-zone") {
        // Zone 3: ticker
        if (selectedWidget === "scrolling-text") {
          zone_data.push({
            zone: 3,
            widget_type: "ticker",
            text: [scrollText],
            background_color: scrollBg,
            text_color: scrollTextColor,
            font: scrollFont,
          });
        } else if (selectedWidget === "rotating-text") {
          zone_data.push({
            zone: 3,
            widget_type: "rotating-banner",
            text: rotatePanels.filter((p) => p.trim() !== ""),
            background_color: rotateBg,
            text_color: rotateTextColor,
            font: rotateFont,
          });
        } else if (selectedWidget === "image") {
          zone_data.push({ zone: 3, widget_type: "rotating-image", images: imageUrls });
        }
        // Zone 4: image (optional)
        if (fiveZoneImageUrl) {
          zone_data.push({ zone: 4, widget_type: "rotating-image", images: [fiveZoneImageUrl] });
        }
      }

      const templateNameMap: Record<TemplateId, string> = {
        "two-zone-vertical": "two_zone_v",
        "two-zone-horizontal": "two_zone_h",
        "five-zone": "five_zone",
      };

      const res = await fetch("/api/layouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: templateNameMap[selectedTemplate!],
          name: name.trim(),
          description: description.trim(),
          zone_data,
          clock_weather_scheme: clockWeatherScheme,
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      router.push("/layouts");
    } catch {
      toast.error("Failed to save layout. Please try again.");
      setSaving(false);
    }
  }

  const stepTitles: Record<Step, { heading: string; sub: string }> = {
    1: { heading: "Select a Template", sub: "Choose the layout structure for your screen." },
    2: { heading: "Configure Zones", sub: "Set up the widget for the configurable zone in this layout." },
    3: { heading: "Name Your Layout", sub: "Give your layout a name and an optional description." },
  };

  return (
    <div className="flex flex-col gap-8 pt-4 max-w-3xl">
      <StepIndicator current={step} />

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">{stepTitles[step].heading}</h1>
        <p className="text-sm text-muted-foreground">{stepTitles[step].sub}</p>
      </div>

      {/* ── Step 1: Template ── */}
      {step === 1 && (
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplate(template.id)}
                className={cn(
                  "flex flex-col gap-3 rounded-lg border-2 p-3 text-left transition-colors",
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40"
                )}
              >
                <div className="w-full aspect-video rounded overflow-hidden">
                  {template.diagram}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Step 2: Configure widgets ── */}
      {step === 2 && selectedTemplate === "two-zone-vertical" && (
        <WidgetZoneConfig
          label="Ticker Zone"
          description="Choose a widget to display in the bottom ticker bar (1920 × 170px)."
          imageSpec={LANDSCAPE_TICKER_SPECS["two-zone-vertical"]}
          {...widgetProps}
        />
      )}

      {step === 2 && selectedTemplate === "two-zone-horizontal" && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Right Zone — Rotating Images</p>
            <p className="text-xs text-muted-foreground">
              Upload 1–4 images to rotate in the right zone (450 × 1080px). Images will cycle automatically on screen.
            </p>
          </div>
          <ImageWidgetConfig images={images} onImagesChange={setImages} spec={RIGHT_ZONE_IMAGE_SPEC} />
        </div>
      )}

      {step === 2 && selectedTemplate === "five-zone" && (
        <div className="flex flex-col gap-8">
          <ClockWeatherSchemeSelector value={clockWeatherScheme} onChange={setClockWeatherScheme} />

          <WidgetZoneConfig
            label="Ticker Zone"
            description="Choose a widget to display in the bottom ticker bar (1404 × 170px)."
            imageSpec={LANDSCAPE_TICKER_SPECS["five-zone"]}
            {...widgetProps}
          />

          <div className="flex flex-col gap-4 pt-2 border-t">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Image Zone</p>
              <p className="text-xs text-muted-foreground">Upload a single image to display in the image zone (450 × 170px).</p>
            </div>
            <FiveZoneImageUpload image={fiveZoneImage} onImageChange={setFiveZoneImage} />
          </div>
        </div>
      )}

      {/* ── Step 3: Name & description ── */}
      {step === 3 && (
        <div className="flex flex-col gap-5 max-w-sm">
          <div className="flex flex-col gap-2">
            <Label htmlFor="layout-name">Layout Name <span className="text-destructive">*</span></Label>
            <Input
              id="layout-name"
              placeholder="e.g. Lobby Screen"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="layout-desc">
              Description <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="layout-desc"
              placeholder="A short description of where this layout is used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-24"
            />
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex items-center gap-3">
        {step === 1 && (
          <>
            <Button asChild variant="outline">
              <Link href="/layouts">Cancel</Link>
            </Button>
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedTemplate}
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button
              onClick={() => setStep(3)}
              disabled={(() => {
                if (selectedTemplate === "two-zone-horizontal") {
                  return images.every((img) => img === null);
                }
                if (!selectedWidget) return true;
                if (selectedWidget === "scrolling-text") return scrollText.trim() === "";
                if (selectedWidget === "rotating-text") return rotatePanels.every((p) => p.trim() === "");
                if (selectedWidget === "image") return images.every((img) => img === null);
                return false;
              })()}
            >
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleSave} disabled={!name.trim() || saving}>
              {saving ? "Saving..." : "Save Layout"}
            </Button>
          </>
        )}
      </div>

      {step === 3 && (
        <p className="text-xs text-muted-foreground">
          After saving a layout you can preview what it will look like by clicking the &ldquo;Preview Layout&rdquo; option in the layout menu.
        </p>
      )}

    </div>
  );
}
