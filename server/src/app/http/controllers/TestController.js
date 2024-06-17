import asyncHandle from 'express-async-handler';

import { TestModel, ClassModel, AssignExamQuestionModel } from '../../models';

class TestController {
    // [GET] /api/tests
    index = asyncHandle(async (req, res) => {
        const tests = await TestModel.findAll({
            where: {
                status: 0,
            },
            include: [
                {
                    model: AssignExamQuestionModel,
                    include: [{ model: ClassModel }],
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: tests,
        });
    });

    // [GET] /api/tests/:id
    show = asyncHandle(async (req, res) => {
        const { id } = req.params;

        const tests = await TestModel.findAll({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: true,
            data: tests,
        });
    });

    // [POST] /api/tests
    store = asyncHandle(async (req, res) => {
        // useId, typeTest
        const {
            subjectName,
            title,
            examTime,
            startTime,
            endTime,
            seeTestScores,
            reviewTheTest,
            submitTestWhenChangeTab,
            numberOfEasyQuestion,
            numberOfBasicQuestion,
            numberOfDifficultQuestion,
        } = req.body;

        if (
            !subjectName ||
            !title ||
            !examTime ||
            !startTime ||
            !endTime ||
            !seeTestScores ||
            !reviewTheTest ||
            !submitTestWhenChangeTab ||
            numberOfBasicQuestion === undefined ||
            numberOfEasyQuestion === undefined ||
            numberOfDifficultQuestion === undefined
        ) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ dữ liệu',
            });
        }

        req.body.userId = req.user.id;
        req.body.typeTest = false;

        const newTest = await TestModel.create(req.body);
        res.status(200).json({
            success: newTest ? true : false,
            newTest: newTest ? newTest : 'Tạo đề thi thất bại',
        });
    });

    // [PUT] /api/tests
    update = asyncHandle(async (req, res) => {
        const { id } = req.params;

        const data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Missing inputs!',
            });
        }

        const [isUpdate] = await TestModel.update(data, { where: { id } });

        res.status(200).json({
            success: isUpdate ? true : false,
            message: isUpdate
                ? 'Cập nhật đề thi thành công'
                : 'Cập nhật đề thi thất bại!',
        });
    });

    // [DELETE] /api/tests
    delete = asyncHandle(async (req, res) => {
        const { id } = req.params;

        const [isDelete] = await TestModel.update(
            { status: 1 },
            { where: { id } }
        );

        res.status(200).json({
            success: isDelete ? true : false,
            message: isDelete ? 'Xoá đề thi thành công' : 'Xoá đề thi thấy bại',
        });
    });
}

export default new TestController();
