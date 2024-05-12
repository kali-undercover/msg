export default function toIframeUrl(url) {
    try {
        var newURL = new URL(url);

        if (newURL.origin == "https://www.youtube.com" && newURL.pathname == "/watch") {
            return `https://www.youtube.com/embed/${newURL.searchParams.get("v")}`
        }

        return newURL.toString();
    } catch (error) {
        return url;
    }
}