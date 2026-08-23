'use strict';

const express = require('express');

const projectDetailsRepository =
    require('../projectDetailsRepository');

const app = express();

app.use(express.json());

/*
 * CORS
 */
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

/*
 * Home
 */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        name: 'projectDetails API',
        version: '1.0.0',
        message: 'projectDetails API is running successfully.',
        endpoints: {
            allProjectDetails: 'GET /api/projectDetails',
            projectDetailById: 'GET /api/projectDetails/:id',
            randomProjectDetails:
                'GET /api/projectDetails/random/:number',
            byCategory:
                'GET /api/projectDetails/category/:category'
        }
    });
});

/*
 * GET ALL PROJECT DETAILS
 *
 * GET /api/projectDetails
 */
app.get('/api/projectDetails', (req, res) => {
    try {
        const projectDetails =
            projectDetailsRepository.getAll();

        return res.status(200).json({
            success: true,
            count: projectDetails.length,
            data: projectDetails
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch project details.'
        });
    }
});

/*
 * GET PROJECT DETAIL BY ID
 *
 * GET /api/projectDetails/1
 */
app.get('/api/projectDetails/:id', (req, res) => {
    try {
        const projectDetail =
            projectDetailsRepository.getById(
                req.params.id
            );

        if (!projectDetail) {
            return res.status(404).json({
                success: false,
                message: 'Project detail not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: projectDetail
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch project detail.'
        });
    }
});

/*
 * GET RANDOM PROJECT DETAILS
 *
 * GET /api/projectDetails/random/3
 */
app.get(
    '/api/projectDetails/random/:number',
    (req, res) => {
        try {
            const number =
                Number(req.params.number);

            if (
                !Number.isInteger(number) ||
                number <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Number must be a positive integer.'
                });
            }

            const projectDetails =
                projectDetailsRepository.getRandom(
                    number
                );

            return res.status(200).json({
                success: true,
                count: projectDetails.length,
                data: projectDetails
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    'Failed to fetch random project details.'
            });
        }
    }
);

/*
 * GET PROJECT DETAILS BY CATEGORY
 *
 * GET /api/projectDetails/category/frontend
 */
app.get(
    '/api/projectDetails/category/:category',
    (req, res) => {
        try {
            const projectDetails =
                projectDetailsRepository.getByCategory(
                    req.params.category
                );

            if (projectDetails.length === 0) {
                return res.status(404).json({
                    success: false,
                    message:
                        'No project details found for this category.'
                });
            }

            return res.status(200).json({
                success: true,
                count: projectDetails.length,
                data: projectDetails
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message:
                    'Failed to fetch project details by category.'
            });
        }
    }
);

/*
 * 404 HANDLER
 */
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Endpoint not found.'
    });
});

/*
 * GLOBAL ERROR HANDLER
 */
app.use((error, req, res, next) => {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: 'Internal server error.'
    });
});

/*
 * IMPORTANT:
 *
 * Do NOT use app.listen() here.
 *
 * Vercel handles the server.
 */
module.exports = app;