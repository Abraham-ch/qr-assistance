import { useEffect } from "react";

const TikTokEmbed = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <blockquote
        className="tiktok-embed border rounded-lg p-4"
        cite="https://www.tiktok.com/@academiadecienciasgalois"
        data-unique-id="academiadecienciasgalois"
        data-embed-type="creator"
        style={{ maxWidth: "780px", minWidth: "288px", maxHeight: "530px", height: "100%", alignItems: "center", alignSelf: "center" }}
      >
        <section className="text-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tiktok.com/@academiadecienciasgalois?refer=creator_embed"
            className="text-blue-500 font-semibold hover:underline"
          >
            @academiadecienciasgalois
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;