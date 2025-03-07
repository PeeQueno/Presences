const presence = new Presence({
  clientId: "630570838084812801"
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    topic = document.querySelector("#section_0"),
    category = document.querySelector("#article > div.wh_block > h1");
  
  if (topic && topic.textContent != "") {
    const author = document.querySelector("#sp_expert_name") || document.querySelector("#sp_expert_team"), date = document.querySelector("#expert_coauthor > p");

    return presence.setActivity({
      details: topic.textContent,
      state: `by ${
        author && author.textContent != "" ? author.textContent : "unknown"
      }${
        date && date.textContent != ""
          ? ` (${date.textContent.replace("Updated: ", "")})`
          : ""
      } `,
      largeImageKey: "banner",
      smallImageKey: "logo",
      smallImageText: decodeURIComponent(document.location.href),
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }

  if (category && category.textContent != "") {
    return presence.setActivity({
      details: "Viewing a category:",
      state: category.textContent,
      largeImageKey: "banner",
      smallImageKey: "logo",
      smallImageText: decodeURIComponent(document.location.href),
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }

  if (path == "/index.php") {
    // Note that I (EGGSY) didn't work on this part, I don't know if it's working on the main site but I'm sure it doesn't work on Spanish version.
    const newTopic = document.getElementsByClassName("firstHeading")[0] ? document.getElementsByClassName("firstHeading")[0].textContent : null;

    return presence.setActivity({
      details: "Editing/Writing How to",
      state: `Topic: ${newTopic ? newTopic : "Unknown."} `,
      largeImageKey: "banner",
      smallImageKey: "logo",
      smallImageText: decodeURIComponent(document.location.href),
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }

  if (path == "/wikiHowTo") {
    const searching = document.location.search.replace("?search=", "").split('+').join(' ');

    return presence.setActivity({
      details: `Searching for:`,
      state: `${
        searching[0].toUpperCase() + searching.slice(1).toLowerCase()
      }`,
      largeImageKey: "banner",
      smallImageKey: "logo",
      smallImageText: "Searching...",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }

  return presence.setActivity({
    details: "Viewing a page:",
    state: "Homepage",
    largeImageKey: "banner",
    smallImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  });
});
