import React from "react";

function getYouTubeEmbedUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const isYouTubeUrl =
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtu.be";

    if (!isYouTubeUrl) {
      return null;
    }

    const videoId = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v");
    const playlistId = url.searchParams.get("list");

    if (url.pathname.startsWith("/embed/")) {
      return url.toString();
    }

    if (videoId) {
      const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

      if (playlistId) {
        embedUrl.searchParams.set("list", playlistId);
      }

      return embedUrl.toString();
    }

    if (playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export const markdownComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ inline, className, children }) => {
    const content = String(children).trim();

    if (className === "language-ytvideo") {
      const embedUrl = getYouTubeEmbedUrl(content);

      if (!embedUrl) {
        return <code>{content}</code>;
      }

      return (
        <iframe
          width="420"
          height="320"
          title="Embedded video"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      );
    }

    if (inline) {
      return <code>{content}</code>;
    }

    return (
      <pre>
        <code>{content}</code>
      </pre>
    );
  },
};
