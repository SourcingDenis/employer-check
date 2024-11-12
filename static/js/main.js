const searchGroups = {
    General: [
        { name: 'DOU', site: 'dou.ua' },
        { name: 'LinkedIn', site: 'linkedin.com' }
    ],
    Legal: [
        { name: 'Opendatabot', site: 'opendatabot.ua' },
        { name: 'YouControl', site: 'youcontrol.com.ua' },
        { name: 'e-Äriregister', site: 'ariregister.rik.ee' },
        { name: 'Торговельна марка', site: 'iprop-ua.com' }
    ],
    Business: [
        { name: 'Clutch', site: 'clutch.co' },
        { name: 'Upwork', site: 'upwork.com' },
        { name: 'GoodFirms', site: 'goodfirms.co' },
        { name: 'Crunchbase', site: 'crunchbase.com' }
    ],
    Other: [
        { name: 'Facebook', site: 'facebook.com' },
        { name: 'Instagram', site: 'instagram.com' },
        { name: 'Glassdoor', site: 'glassdoor.com' },
        { name: 'Indeed', site: 'indeed.com' },
        { name: 'GitHub', site: 'github.com' },
        { name: 'GitLab', site: 'gitlab.com' },
        { name: 'Welcome to the Jungle', site: 'app.welcometothejungle.com' }
    ],
    "General Research Platforms": [
        { name: 'Great Place to Work', site: 'greatplacetowork.com' },
        { name: 'Jobcase', site: 'jobcase.com' },
        { name: 'Fairygodboss', site: 'fairygodboss.com' }
    ],
    "Business-Specific Resources": [
        { name: 'Hoovers', site: 'hoovers.com' },
        { name: 'AngelList', site: 'angel.co' },
        { name: 'Zocdoc', site: 'zocdoc.com' }
    ],
    "Social Media Insights": [
        { name: 'Twitter', site: 'twitter.com' },
        { name: 'Reddit', site: 'reddit.com' }
    ],
    "Job Review Aggregators": [
        { name: 'CareerBliss', site: 'careerbliss.com' },
        { name: 'Comparably', site: 'comparably.com' }
    ]
};

const $query = document.getElementById('query');
const $searchBtn = document.getElementById('searchBtn');
const $linksContainer = document.getElementById('linksContainer');

function getFaviconUrl(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}`;
}

async function generateLinks() {
    const query = $query.value.trim();
    $linksContainer.innerHTML = '';

    if (!query) {
        return;
    }

    const columnLeft = document.createElement('div');
    columnLeft.classList.add('column');
    const columnRight = document.createElement('div');
    columnRight.classList.add('column');
    $linksContainer.appendChild(columnLeft);
    $linksContainer.appendChild(columnRight);

    let columnCounter = 0;

    for (const group in searchGroups) {
        const groupTitle = document.createElement('h3');
        groupTitle.textContent = group;
        groupTitle.classList.add('mt-4', 'mb-2');

        const linkList = document.createElement('ul');
        linkList.classList.add('list-unstyled');

        for (const item of searchGroups[group]) {
            const listItem = document.createElement('li');
            listItem.classList.add('link-item');

            const anchor = document.createElement('a');
            anchor.href = `https://www.google.com/search?q=${encodeURIComponent(`site:${item.site} ${query}`)}`;
            anchor.target = '_blank';
            anchor.classList.add('text-decoration-none');

            // Create image element with error handling
            const img = document.createElement('img');
            img.src = getFaviconUrl(item.site);
            img.alt = `${item.name} icon`;
            img.onerror = function() {
                this.src = '/static/images/default-favicon.ico';
            };

            anchor.appendChild(img);
            anchor.appendChild(document.createTextNode(` ${item.name}`));

            listItem.appendChild(anchor);
            linkList.appendChild(listItem);
        }

        if (columnCounter % 2 === 0) {
            columnLeft.appendChild(groupTitle);
            columnLeft.appendChild(linkList);
        } else {
            columnRight.appendChild(groupTitle);
            columnRight.appendChild(linkList);
        }
        columnCounter++;
    }
}

$searchBtn.addEventListener('click', generateLinks);

$query.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        generateLinks();
    }
});

const urlParams = new URLSearchParams(window.location.search);
const initialQuery = urlParams.get('q');
if (initialQuery) {
    $query.value = initialQuery;
    generateLinks();
}
