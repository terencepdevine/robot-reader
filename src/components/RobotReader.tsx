import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import Button from "./Button";
import Select from "./Select";
import Slider from "./Slider";
import Textarea from "./Textarea";

export default function RobotReader() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredVoices = voices
    .filter((voice) => voice.lang === languages[selectedLanguageIndex])
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const handleVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      const uniqueLangs = Array.from(new Set(allVoices.map((v) => v.lang)));
      setLanguages(uniqueLangs);
    };

    window.speechSynthesis.onvoiceschanged = handleVoices;
    handleVoices();
  }, []);

  useEffect(() => {
    const enIndex = languages.findIndex((lang) => lang === "en-US");
    if (enIndex !== -1) {
      setSelectedLanguageIndex(enIndex);
    }
  }, [languages]);

  useEffect(() => {
    if (filteredVoices.length > 0) {
      setSelectedOptionIndex(0);
    }
  }, [selectedLanguageIndex, voices]);

  const speak = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const text = textarea.value.trim();
    const voice = filteredVoices[selectedOptionIndex];
    if (!text || !voice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      speak();
    }
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <Title />
      <Textarea
        label="Message"
        ref={textareaRef}
        defaultValue="Welcome, I'm your robot reader"
        onKeyDown={handleKeyDown}
      />
      <Select
        label="Voice"
        options={filteredVoices.map((option, index) => ({
          value: index,
          label: option.name,
        }))}
        selectedOptionIndex={selectedOptionIndex}
        setSelectedOptionIndex={setSelectedOptionIndex}
        id="voice-select"
        className=""
      />
      <Select
        label="Language"
        options={languages.map((lang, index) => {
          const [languageCode, regionCode] = lang.split("-");
          const languageName = new Intl.DisplayNames([lang], {
            type: "language",
          }).of(languageCode);
          const regionName = regionCode
            ? new Intl.DisplayNames([lang], { type: "region" }).of(regionCode)
            : null;

          return {
            value: index,
            label: regionName
              ? `${languageName} (${regionName})`
              : `${languageName}`,
          };
        })}
        selectedOptionIndex={selectedLanguageIndex}
        setSelectedOptionIndex={setSelectedLanguageIndex}
        id="language-select"
        className=""
      />

      <div className="sliders-wrap">
        <Slider
          label="Pitch"
          value={pitch}
          min={0}
          max={2}
          step={0.01}
          id="pitch-slider"
          onChange={setPitch}
        />
        <Slider
          label="Rate"
          value={rate}
          min={0}
          max={2}
          step={0.01}
          id="rate-slider"
          onChange={setRate}
        />
      </div>
      <Button speak={speak}>Read Text</Button>
    </form>
  );
}
