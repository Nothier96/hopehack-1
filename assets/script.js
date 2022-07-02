const client_id = "oobVGja6bsRkU5qU1PWjcMnjEK0nIMfgBttT0V8V";
const client_secret =
  "n8MLcxcTb4xS0cbKE4stYVWeawQ2u6oVxeHZDAD21PGFXfM8SqtD59PSHMomab9n233p5B0MrkLeGAjK9xMz7YqJoeQKrxRqHNxecbmyqvnPugnemfwQr4yKF0RmNw7L";
const client = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
async function fetchCourse() {
  try {
    const response = await fetch(
      "https://redventures.udemy.com/api-2.0/courses/?duration=medium&ordering=most-reviewed&page=2&page_size=12&price=price-paid&search=javascript",
      {
        headers: {
          Authorization: `Basic ${client}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

function listCourses(postcontainerid) {
  const checkId = document.getElementById(postcontainerid);
  if (!checkId) {
    return;
  }
  fetchCourse((posts) => {})
    .then()
    .catch((err) => {
      console.log(err);
    });
}
