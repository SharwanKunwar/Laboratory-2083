'use strict';

const projectDetails = require('./projectDetails');

function getAll() {
    return projectDetails;
}

function getById(id) {
    return projectDetails.find(
        project => project.id === Number(id)
    );
}

function getRandom(numberOfProjects) {
    const requestedNumber = Number(numberOfProjects);

    const number =
        Number.isInteger(requestedNumber) &&
            requestedNumber > 0
            ? requestedNumber
            : 1;

    const limit = Math.min(
        number,
        projectDetails.length
    );

    const availableProjects = [...projectDetails];

    const result = [];

    for (let i = 0; i < limit; i++) {
        const randomIndex = Math.floor(
            Math.random() * availableProjects.length
        );

        const randomProject =
            availableProjects.splice(
                randomIndex,
                1
            )[0];

        result.push(randomProject);
    }

    return result;
}

function getByCategory(category) {
    const requestedCategory =
        String(category).toLowerCase();

    return projectDetails.filter(
        project =>
            project.category.toLowerCase() ===
            requestedCategory
    );
}

module.exports = {
    getAll,
    getById,
    getRandom,
    getByCategory
};