import { useState } from "react";
import Confetti from "react-confetti"; 
import { useWindowSize } from "react-use"; 

// Importiere dein Hintergrundbild hier, falls es im src/assets Ordner liegt
// Falls es im public ordner liegt, brauchst du diesen Import nicht (siehe unten beim div)
import bgImage from "./assets/bg1.webp"; // <-- Passe den Namen an!

const phrases = [
  "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
  "Surely not?", "You might regret this!", "Give it another thought!", 
  "Are you absolutely certain?", "This could be a mistake!", "Have a heart!", 
  "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?", 
  "Is that your final answer?", "You're breaking my heart ;(", 
  "Plsss? :( You're breaking my heart"
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const { width, height } = useWindowSize();

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    // HINTERGRUND-ANPASSUNG:
    // Hier setzen wir das Bild als Hintergrund, der den ganzen Screen füllt (bg-cover)
    <div 
      className="flex flex-col items-center justify-center h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900 overflow-hidden relative bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${bgImage})` // Nutze hier dein importiertes Bild
        // ODER wenn es im public Ordner ist: backgroundImage: `url('/bg.jpg')`
      }}
    >
      
      {/* Wenn "Ja" gedrückt wird, regnet es Konfetti */}
      {yesPressed && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

      {/* Ein dunklerer Layer über dem Bild, damit der Text lesbar bleibt (optional) */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -z-10"></div>

      {yesPressed ? (
        <>
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bear Kiss"
            className="rounded-lg shadow-xl mb-4" 
          />
          <div className="text-4xl md:text-6xl font-bold my-4 text-rose-600 animate-bounce">
            Ok Yayyyyy!!! ❤️
          </div>
        </>
      ) : (
        <>
          <img
            className="h-[230px] rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
            src="https://media1.tenor.com/m/4w_3lAm-atIAAAAC/teddy-bear-for-you.gif"
            alt="Cute Bear"
          />
          
          <h1 className="text-4xl md:text-6xl my-8 text-center font-extrabold text-zinc-800 drop-shadow-sm">
            Emilia, will you be my Valentine?
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            
            <button
              onClick={handleNoClick}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 text-xs md:text-sm backdrop-blur-md bg-white/30 p-2 rounded-lg border border-white/50 hover:bg-white/50 transition-colors shadow-sm"
      href="https://github.com/JulianW99/valentine"
      target="_blank"
      rel="noreferrer"
    >
      Made with <span className="text-red-500 animate-pulse">❤️</span>
    </a>
  );
};
