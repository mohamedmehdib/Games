import Image from 'next/image';
import Link from 'next/link';

export default function Main() {

  const games = [
    {src : "/memory.jpeg" , url : "Memory"},
    {src : "/tic.jpeg" , url : "TicTacToe"},
    {src : "/quiz.png" , url : "Quiz"},
  
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <h1 className="text-center py-16 text-3xl">Welcome to Mohamed Mehdi&apos;s Games!</h1>
      <ul className="flex justify-center gap-6 flex-wrap">
        {
          games.map((item,index)=>(
            <Link key={index} href={`/${item.url}`} className="hover:scale-110 transform transition-transform duration-300 w-60 h-60 relative border-2 border-white rounded-lg overflow-hidden">
              <Image
                src={item.src}
                alt={item.url}
                layout="fill"
                className="object-cover transform transition-transform duration-300 scale-105 hover:scale-125"
              />
            </Link>
          ))
        }
      </ul>
    </div>
  );
}
