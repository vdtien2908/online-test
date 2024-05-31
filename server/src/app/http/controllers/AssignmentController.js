import asyncHandler from 'express-async-handler';

import { AssignmentModel } from '../../models';

class AssignmentController {
    // [POST] /api/assignments
    store = asyncHandler(async (req, res) => {
        const { userId, subjectId } = req.body;

        // Validate input data
        if (!userId || !subjectId) {
            return res.status(400).json({
                success: false,
                message: 'Missing inputs',
            });
        }

        const newAssignment = await AssignmentModel.create(req.body);

        res.status(200).json({
            success: newAssignment ? true : false,
            newAssignment: newAssignment
                ? newAssignment
                : 'Can not created new assignment',
        });
    });

    // [DELETE] /api/assignments
    delete = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const [isDeleteAssignment] = await AssignmentModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDeleteAssignment ? true : false,
            message: isDeleteAssignment
                ? 'Deleted assignment successfully!'
                : 'Can not deleted assignment!',
        });
    });
}

export default new AssignmentController();
