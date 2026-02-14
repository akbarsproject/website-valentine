import { Howl } from "howler";

type ToneOptions = {
  freq: number;
  duration: number;
  volume?: number;
};

const sampleRate = 44100;

function writeString(view: DataView, offset: number, value: string) {
  for (let i = 0; i < value.length; i += 1) {
    view.setUint8(offset + i, value.charCodeAt(i));
  }
}

function encodeWav(samples: Float32Array) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i] || 0));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

function createTone({ freq, duration, volume = 0.25 }: ToneOptions) {
  const length = Math.floor(sampleRate * duration);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const env = Math.min(1, t * 2) * (1 - t / duration);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * volume * env;
  }
  return encodeWav(samples);
}

function createChord(freqs: number[], duration: number, volume = 0.2) {
  const length = Math.floor(sampleRate * duration);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const env = Math.min(1, t * 3) * (1 - t / duration);
    let value = 0;
    freqs.forEach((freq) => {
      value += Math.sin(2 * Math.PI * freq * t);
    });
    samples[i] = (value / freqs.length) * volume * env;
  }
  return encodeWav(samples);
}

function createWhoosh(duration = 0.35, volume = 0.22) {
  const length = Math.floor(sampleRate * duration);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const env = Math.pow(1 - t / duration, 2);
    const noise = (Math.random() * 2 - 1) * env;
    samples[i] = noise * volume;
  }
  return encodeWav(samples);
}

function createHeartbeat(duration = 0.8) {
  const length = Math.floor(sampleRate * duration);
  const samples = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const pulse = Math.exp(-Math.pow((t - 0.12) * 25, 2)) + Math.exp(-Math.pow((t - 0.38) * 18, 2));
    samples[i] = Math.sin(2 * Math.PI * 90 * t) * pulse * 0.35;
  }
  return encodeWav(samples);
}

export function createSoundBank() {
  const ambient = new Howl({
    src: ["/audio/romance.mp3"],
    loop: true,
    volume: 0.45,
  });

  const whoosh = new Howl({
    src: [createWhoosh()],
    volume: 0.6,
  });

  const yes = new Howl({
    src: [createChord([262, 330, 392], 1.6, 0.22)],
    volume: 0.8,
  });

  const heartbeat = new Howl({
    src: [createHeartbeat()],
    loop: true,
    volume: 0.35,
  });

  const sparkle = new Howl({
    src: [createTone({ freq: 880, duration: 0.5, volume: 0.2 })],
    volume: 0.6,
  });

  return { ambient, whoosh, yes, heartbeat, sparkle };
}
