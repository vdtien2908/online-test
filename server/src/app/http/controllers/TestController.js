import asyncHandle from 'express-async-handler';
import { Op } from 'sequelize';

import {
    AnswerModel,
    TestModel,
    ClassModel,
    AssignExamQuestionModel,
    QuestionModel,
    TestDetailModel,
    ResultDetailModel,
    ResultModel,
    ClassDetailModel,
    AssignmentModel,
    SubjectModel,
    UserModel,
} from '../../models';

class TestController {
    // [GET] /api/tests
    index = asyncHandle(async (req, res) => {
        const userId = req.user.id;
        const classDetail = await ClassDetailModel.findAll({
            where: {
                userId,
            },
        });

        const assignments = await AssignmentModel.findAll({
            where: {
                userId,
            },
            include: [{ model: SubjectModel }],
        });

        const subjectNames = assignments.map(
            (item) => item.SubjectModel.subjectName
        );

        const classIds = classDetail.map((item) => item.classId);
        const { search, subjectName, typeTest } = req.query;
        const whereConditions = {
            status: 0,
        };

        const currentTime = new Date();
        const type = Number(typeTest);
        if (type === 0) {
            whereConditions.startTime = {
                [Op.gt]: `%${currentTime}%`,
            };
        } else if (type === 1) {
            whereConditions.startTime = {
                [Op.lt]: `%${currentTime}%`,
            };
            whereConditions.endTime = {
                [Op.gt]: `%${currentTime}%`,
            };
        } else if (type === 2) {
            whereConditions.endTime = {
                [Op.lt]: `%${currentTime}%`,
            };
        }

        if (search) {
            whereConditions.title = {
                [Op.like]: `%${search}%`,
            };
        }

        if (subjectName) {
            whereConditions.subjectName = {
                [Op.like]: `%${subjectName}%`,
            };
        }

        const whereConditionsResultModel = {};

        if (req.user.role === 2) {
            whereConditions['$AssignExamQuestionModels.classId$'] = {
                [Op.in]: classIds,
            };
        }

        if (req.user.role === 3) {
            whereConditions.subjectName = {
                [Op.in]: subjectNames,
            };
        }

        const tests = await TestModel.findAll({
            where: whereConditions,
            include: [
                {
                    model: AssignExamQuestionModel,
                    include: [{ model: ClassModel }],
                },
                {
                    model: ResultModel,
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: tests,
            subjectNames,
        });
    });

    // [GET] /api/tests/:id
    show = asyncHandle(async (req, res) => {
        const { id } = req.params;

        const tests = await TestModel.findAll({
            where: {
                id,
            },
            include: [
                {
                    model: ResultModel,
                    include: [
                        {
                            model: UserModel,
                            attributes: ['id', 'code', 'fullName'],
                        },
                    ],
                },
                {
                    model: AssignExamQuestionModel,
                    include: [{ model: ClassModel }],
                },
            ],
        });

        const testDetails = await TestDetailModel.findAll({
            where: {
                testId: id,
            },
        });

        const questionIds = testDetails.map((item) => {
            return item.questionId;
        });

        const questions = await QuestionModel.findAll({
            where: {
                id: {
                    [Op.in]: questionIds,
                },
            },
            include: [{ model: AnswerModel }],
        });

        res.status(200).json({
            success: true,
            data: { tests, questions },
        });
    });

    // [POST] /api/tests
    store = asyncHandle(async (req, res) => {
        // useId, typeTest
        const {
            listClass,
            subject,
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
            Object.keys(subject).length === 0 ||
            !title ||
            !examTime ||
            !startTime ||
            !endTime ||
            seeTestScores === undefined ||
            reviewTheTest === undefined ||
            submitTestWhenChangeTab === undefined ||
            numberOfBasicQuestion === undefined ||
            numberOfEasyQuestion === undefined ||
            numberOfDifficultQuestion === undefined
        ) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ dữ liệu',
            });
        }

        const data = {
            subjectName: subject.subjectName,
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
            userId: req.user.id,
            typeTest: false,
        };

        const newTest = await TestModel.create(data);

        const testId = newTest.id;
        const modules = listClass.map((item) => {
            return { classId: item.id, testId };
        });

        const easy = await QuestionModel.findAll({
            where: {
                lever: 1,
                status: 0,
                subjectId: subject.id,
            },
        });

        const basic = await QuestionModel.findAll({
            where: {
                lever: 2,
                status: 0,
                subjectId: subject.id,
            },
        });

        const difficult = await QuestionModel.findAll({
            where: {
                lever: 3,
                status: 0,
                subjectId: subject.id,
            },
        });

        const randomValue = (numberQuestion, totalQuestion) => {
            let i = 0;
            const randomNumber = [];
            while (i < numberQuestion) {
                const number = Math.floor(Math.random() * totalQuestion);
                if (randomNumber.includes(number)) {
                    continue;
                } else {
                    randomNumber.push(number);
                    i++;
                }
            }

            return randomNumber;
        };

        const easyNumber = randomValue(numberOfEasyQuestion, easy.length);
        const basicNumber = randomValue(numberOfBasicQuestion, basic.length);
        const difficultNumber = randomValue(
            numberOfDifficultQuestion,
            difficult.length
        );

        const easyQuestions = easyNumber.map((item) => {
            return easy[item];
        });

        const basicQuestions = basicNumber.map((item) => {
            return basic[item];
        });

        const difficultQuestions = difficultNumber.map((item) => {
            return difficult[item];
        });

        const questions = [
            ...basicQuestions,
            ...easyQuestions,
            ...difficultQuestions,
        ];

        const testDetails = questions.map((question, index) => {
            return {
                testId,
                questionId: question.id,
                sortOrder: index,
            };
        });

        await AssignExamQuestionModel.bulkCreate(modules);
        await TestDetailModel.bulkCreate(testDetails);
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

    // [POST] /api/tests/submit
    submit = asyncHandle(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        const numberOfTabSwitch = 0;
        const {
            testScore,
            examTime,
            testTime,
            numberOfCorrectAnswer,
            resultTest,
        } = req.body;

        const data = {
            testScore,
            examTime,
            testTime,
            numberOfCorrectAnswer,
            numberOfTabSwitch,
            testId: id,
            userId,
        };

        const newResult = await ResultModel.create(data);

        const resultId = newResult.id;

        const detailResults = resultTest.map((item) => {
            return {
                resultId: resultId,
                questionId: item.question,
                selectedAnswer: item.answerId,
            };
        });

        await ResultDetailModel.bulkCreate(detailResults);

        res.status(200).json({
            success: true,
            message: 'Nộp bài kiểm tra thành công',
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
