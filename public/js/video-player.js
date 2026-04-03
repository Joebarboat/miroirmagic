document.addEventListener("DOMContentLoaded", () => {
    if (!window.videojs) {
        console.error("Video.js not loaded");
        return;
    }

    document.querySelectorAll("video.video-js").forEach((videoEl) => {
        const youtubeUrl = videoEl.dataset.youtube;

        if (!youtubeUrl) return;

        const player = videojs(videoEl, {
            techOrder: ["youtube"],
            controls: true,
            autoplay: false,
            preload: "auto",
            fluid: true,
            sources: [
                {
                    type: "video/youtube",
                    src: youtubeUrl,
                },
            ],
            youtube: {
                iv_load_policy: 1,
            },
        });

        player.ready(() => {
            player.bigPlayButton.show();
        });
    });
});
