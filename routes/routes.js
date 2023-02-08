import axios from "axios";
import { Router } from "express";

const dataRouter = Router();

let savedCategories = {};

dataRouter.get("/pictures/:category", paginatedResults(), (req, res) => {
    try {
        if (res.paginatedResults) {
            res.status(200).send(res.paginatedResults);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

function paginatedResults(sortBy) {
    // middleware function
    return async (req, res, next) => {
        const requestCategory = req.params.category;
        let savedData = savedCategories[requestCategory];
        try {
            if (!savedData) {
                const { data } = await axios.get(
                    `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${requestCategory}`
                );
                savedData = data;
            }

            if (sortBy) sortByFunc(savedData.hits, sortBy);

            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            // calculating the starting and ending index
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};
            if (endIndex < savedData.hits.length) {
                results.next = {
                    page: page + 1,
                    limit: limit,
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }

            results.results = savedData.hits.slice(startIndex, endIndex);

            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(400).send(error);
        }
    };
}

dataRouter.get(
    "/pictures/sortById/:category",
    paginatedResults("id"),
    (req, res) => {
        try {
            if (res.paginatedResults) {
                res.status(200).send(res.paginatedResults);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

dataRouter.get(
    "/pictures/sortByLikes/:category",
    paginatedResults("likes"),
    (req, res) => {
        try {
            if (res.paginatedResults) {
                res.status(200).send(res.paginatedResults);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

dataRouter.get(
    "/pictures/sortByDownloads/:category",
    paginatedResults("downloads"),
    (req, res) => {
        try {
            if (res.paginatedResults) {
                res.status(200).send(res.paginatedResults);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

dataRouter.get(
    "/pictures/sortByViews/:category",
    paginatedResults("views"),
    (req, res) => {
        try {
            if (res.paginatedResults) {
                res.status(200).send(res.paginatedResults);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
);
dataRouter.get(
    "/pictures/sortByComments/:category",
    paginatedResults("comments"),
    (req, res) => {
        try {
            if (res.paginatedResults) {
                res.status(200).send(res.paginatedResults);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

function sortByFunc(arr, fieldName) {
    arr.sort((a, b) => a[fieldName] - b[fieldName]);
}

export { dataRouter };
