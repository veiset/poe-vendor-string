import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {GeneratedDataError, onGeneratedDataError} from "@shared/generatedData";
import {ErrorCard} from "./ErrorCard";

/** Says when a generated file the page needed failed to load, until the page or the language changes. */
export const GeneratedDataFileError = ({language}: {language: string}) => {
  const [fileError, setFileError] = useState<GeneratedDataError>();
  const {pathname} = useLocation();

  useEffect(() => onGeneratedDataError(setFileError), []);
  // A failed file belongs to the page and language that loaded it
  useEffect(() => setFileError(undefined), [pathname, language]);

  if (!fileError) return null;
  return (
    <div className="generated-data-file-error" role="alert">
      <ErrorCard
        partial
        title="Some data couldn't be loaded"
        text="This page may be incomplete. Try again in a few minutes, and if it still fails, let us know on Discord or GitHub."
        detail={fileError.message}
        onRetry={() => window.location.reload()}
        problem={`Error loading data: ${fileError.file}`}
      />
    </div>
  );
};
