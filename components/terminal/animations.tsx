"use client";

import React, { useState, useEffect, useRef } from 'react';

const ROCKET_FRAMES = [
    `
           /\\
          /  \\
         /    \\
        /      \\
       /  NASA  \\
      /__________\\
      |          |
      |          |
      |          |
      |          |
     /|    ()    |\\
    / |          | \\
   /  |          |  \\
  /   |          |   \\
 /    |__________|\   \\
|    /            \\  |
|   /              \\ |
|  /                \\|
    `,
    `
           /\\
          /  \\
         /    \\
        /      \\
       /  NASA  \\
      /__________\\
      |          |
      |          |
      |          |
      |          |
     /|    ()    |\\
    / |          | \\
   /  |          |  \\
  /   |          |   \\
 /    |__________|\   \\
|    /     🔥     \\  |
|   /      🔥      \\ |
|  /       🔥       \\|
    `,
    `
           /\\
          /  \\
         /    \\
        /      \\
       /  NASA  \\
      /__________\\
      |          |
      |          |
      |          |
      |          |
     /|    ()    |\\
    / |          | \\
   /  |          |  \\
  /   |          |   \\
 /    |__________|\   \\
|    /     🔥🔥   \\  |
|   /      🔥🔥    \\ |
|  /       🔥🔥     \\|
    `,
    `
           /\\
          /  \\
         /    \\
        /      \\
       /  NASA  \\
      /__________\\
      |          |
      |          |
      |          |
      |          |
     /|    ()    |\\     
    / |          | \\   🔥
   /  |          |  \\ 🔥🔥
  /   |          |   🔥🔥
 /    |__________|\  🔥🔥
|    /            \\  🔥 
|   /              🔥  |
|  /                🔥 |
    `,
    `
           /\\
          /  \\
         /    \\
        /      \\
       /  NASA  \\
      /__________\\
      |          |
      |          |
      |          |
      |          |
     /|    ()    |\\     
    / |          | \\   🔥🔥
   /  |          |  \\ 🔥🔥🔥
  /   |          |   🔥🔥🔥
 /    |__________|\  🔥🔥🔥
|    /            \\  🔥🔥  
|   /              🔥🔥    
|  /                🔥🔥  
    `,
];

const TRAIN_FRAMES = [
    `
         ~  ~          
      ~~ ~ ~~ ~      .   . _ _  
    ~ ~~~.~.~~      _____[_]_|_|
      .-(_)           ||   | | |
     _/--|\\________  ||   | | |
    | +++++ |__ --|   ||   | | |
   =| +++++ |  | ~|___||___|_|_|
    |_______|__|  |_____||___|  
     (o)-(o)-(o)  (o)-(o)-(o)`,
    `
       ~  ~           
    ~~ ~ ~~ ~      .   . _ _  
  ~ ~~~.~.~~      _____[_]_|_|
    .-(_)           ||   | | |
   _/--|\\________  ||   | | |
  | +++++ |__ --|   ||   | | |
 =| +++++ |  | ~|___||___|_|_|
  |_______|__|  |_____||___|  
   (o)-(o)-(o)  (o)-(o)-(o)`,
    `
     ~  ~           
  ~~ ~ ~~ ~      .   . _ _  
~ ~~~.~.~~      _____[_]_|_|
  .-(_)           ||   | | |
 _/--|\\________  ||   | | |
| +++++ |__ --|   ||   | | |
| +++++ |  | ~|___||___|_|_|
|_______|__|  |_____||___|  
 (o)-(o)-(o)  (o)-(o)-(o)`,
    `
   ~  ~           
~~ ~ ~~ ~      .   . _ _  
~~~.~.~~      _____[_]_|_|
.-(_)           ||   | | |
/--|\\________  ||   | | |
+++++ |__ --|   ||   | | |
+++++ |  | ~|___||___|_|_|
______|__|  |_____||___|  
(o)-(o)-(o)  (o)-(o)-(o)`,
    `
 ~  ~           
~ ~ ~~ ~      .   . _ _  
~.~.~~       _____[_]_|_|
(_)            ||   | | |
-|\\________   ||   | | |
++++ |__ --|   ||   | | |
++++ |  | ~|___||___|_|_|
_____|__|  |_____||___|  
o)-(o)-(o)  (o)-(o)-(o)`,
    `
 ~  ~           
~ ~ ~~ ~      .   . _ _  
~.~.~~       _____[_]_|_|
(_)            ||   | | |
-|\\________   ||   | | |
++++ |__ --|   ||   | | |
++++ |  | ~|___||___|_|_|
_____|__|  |_____||___|  
o)-(o)-(o)  (o)-(o)-(o)`,
    `
 ~  ~           
~ ~ ~~ ~      .   . _ _  
~.~.~~       _____[_]_|_|
(_)            ||   | | |
-|\\________   ||   | | |
++++ |__ --|   ||   | | |
++++ |  | ~|___||___|_|_|
_____|__|  |_____||___|  
o)-(o)-(o)  (o)-(o)-(o)`,
];

export const RocketAnimation: React.FC = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % ROCKET_FRAMES.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <pre className="ascii-art large text-yellow-500 animate-float animate-pulse-fast">
            {ROCKET_FRAMES[frame]}
        </pre>
    );
};

export const TrainAnimation: React.FC = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % TRAIN_FRAMES.length);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-block">
            <pre className="ascii-art text-green-500 animate-slideIn">
                {TRAIN_FRAMES[frame]}
            </pre>
        </div>
    );
};

export const MatrixRain: React.FC = () => {
    const [characters, setCharacters] = useState<string[][]>([]);
    const matrixRef = useRef<HTMLDivElement>(null);
    const rows = 20;
    const cols = 40;

    useEffect(() => {
        const matrixChars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
        const initialMatrix = Array(rows).fill(0).map(() =>
            Array(cols).fill(' ')
        );
        const drops = Array(cols).fill(0);

        const interval = setInterval(() => {
            const newMatrix = Array(rows).fill(0).map((_, i) =>
                Array(cols).fill(' ')
            );

            for (let i = 0; i < cols; i++) {
                if (drops[i] > 0) {
                    const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    if (drops[i] < rows) {
                        newMatrix[drops[i]][i] = char;
                    }
                    drops[i]++;

                    for (let j = 1; j < 5 && drops[i] - j >= 0 && drops[i] - j < rows; j++) {
                        newMatrix[drops[i] - j][i] = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    }
                }

                if (drops[i] === 0 || drops[i] > rows + 4) {
                    drops[i] = Math.random() > 0.95 ? 1 : 0;
                }
            }

            setCharacters(newMatrix);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={matrixRef} className="matrix-rain mb-4 h-96 overflow-hidden">
            {characters.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((char, j) => (
                        <span
                            key={`${i}-${j}`}
                            className={`${char !== ' ' ? 'animate-fadeIn' : ''} text-green-500`}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};