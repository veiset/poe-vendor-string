import React, { useMemo, useState } from "react";
import { SavedSettings, defaultSettings } from "../../utils/SavedSettings";

interface ProfileExportBoxProps {
  settings: SavedSettings;
  setShow: (n: boolean) => void;
}

const ProfileExportBox = (props: ProfileExportBoxProps) => {
  const { settings, setShow } = props;
  const [copied, setCopied] = useState(false);

  // Serialize the profile object to a Base64 string
  const base64Profile = useMemo(() => {
    try {
      const minimalSettings: Record<string, any> = {};

      (Object.keys(settings) as Array<keyof SavedSettings>).forEach((key) => {
        const currentVal = settings[key];
        const defaultVal = defaultSettings[key];

        // 1. Check if the value is a standard nested object (not null, not an array)
        if (
          typeof currentVal === "object" &&
          currentVal !== null &&
          !Array.isArray(currentVal)
        ) {
          const nestedDeltas: Record<string, any> = {};

          // Loop through the nested object one level deeper
          Object.keys(currentVal).forEach((nestedKey) => {
            const nestedCurrent = (currentVal as Record<string, any>)[nestedKey];
            const nestedDefault = defaultVal
              ? (defaultVal as Record<string, any>)[nestedKey]
              : undefined;

            if (JSON.stringify(nestedCurrent) !== JSON.stringify(nestedDefault)) {
              nestedDeltas[nestedKey] = nestedCurrent;
            }
          });

          // Only add this top-level key if there were actually nested changes
          if (Object.keys(nestedDeltas).length > 0) {
            minimalSettings[key as string] = nestedDeltas;
          }
        }
        // 2. Handle primitives (strings, numbers, booleans) and Arrays
        else {
          if (JSON.stringify(currentVal) !== JSON.stringify(defaultVal)) {
            minimalSettings[key as string] = currentVal;
          }
        }
      });

      // Stringify the stripped-down object
      const jsonString = JSON.stringify(minimalSettings) || "{}";
      console.log(jsonString);

      // Encode to Base64 safely
      return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (e) {
      console.error("Failed to serialize profile", e);
      return "Error generating export string.";
    }
  }, [settings]);

  const handleCopy = () => {
    navigator.clipboard.writeText(base64Profile).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="new-profile-box export-profile-box">
      <div className="profile-header">⍐ Export profile: {settings.name}</div>

      <div className="profile-input-area">
        <p style={{ margin: "0 0 8px 0", fontSize: "0.9em", opacity: 0.8 }}>
          Copy this string to export your profile:
        </p>
        <textarea
          readOnly
          value={base64Profile}
          rows={5}
          style={{ width: "98%", height: "120px", resize: "vertical", fontFamily: "monospace" }}
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      </div>

      <div className="profile-button-area">
        <button className="import-button" onClick={handleCopy}>
          {copied ? "Copied✓" : "Copy"}
        </button>
        <button
          className="import-button"
          style={{ backgroundColor: "#444e5b" }}
          onClick={() => setShow(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileExportBox;