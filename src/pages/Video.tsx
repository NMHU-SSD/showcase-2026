import Navbar from "../components/Navbar";

export default function ProjectPage({ title, url, videoProps }: { title: string; url: string, videoProps?: React.VideoHTMLAttributes<HTMLVideoElement> }) {

  return (
    <>
      <Navbar />
      <main className="w-full p-8 bg-background">

        <div className="flex w-full flex-col ">

          <h1 className="text-6xl font-bold mb-4">{title}</h1>
          
          <video className="flex w-full" width={'100%'} height={'500'} {...videoProps}>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>  

        </div>
      </main>
    </>
  );
}