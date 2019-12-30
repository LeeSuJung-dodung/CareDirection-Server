const { Router } = require('express')

const product = Router()

const productCtrl = require('../controller/productController')
const { multer } = require('../../config/multer')
const needAuth = require('../middlewares/userCheck')

const upload = multer('product')

// 제품 케디의 기준 목록
product.get('/:product_idx/standard', productCtrl.getProductStandard)
// 복용제품 등록 위한 정보 가져오기
product.get('/:product_idx/dose', needAuth, productCtrl.importDose)
// 현재 복용제품 추가
product.post('/:product_idx/dose', needAuth, productCtrl.enrollDose)
// 현재 복용 제품 정보수정
product.put('/:product_idx/dose', needAuth, productCtrl.modifyDose)
// 현재 복용 제품 삭제하기
product.delete('/:product_idx/dose', needAuth, productCtrl.deleteDoseProduct)
// ADMIN 제품 등록하기
product.post('/', upload.single('file'), productCtrl.insertProduct)
// 복용 제품 (오늘 복용 등록), post
product.post('/:product_idx/dose/check', needAuth, productCtrl.checkProductDose)
// 복용 제품 (오늘 복용 취소), delete
product.delete('/:product_idx/dose/check', needAuth, productCtrl.unCheckProductDose)


module.exports = product
