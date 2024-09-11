const store = require('../models/store.models')

exports.createstore = async (req, res) => {
    try {
        let { multipleQty, recieveQty, storeuploadFile, storedate,status, Invoicenumber, DriverContactNumber, total, Invoicedate, TransporterName, LRNumber, DriverName, VehicleNumber, EwayBillNumber, Frieght, Remark, purchase } = req.body;

        let checkstore = await store.findOne({ purchase })

        if (checkstore) {
            return res.status(409).json({ status: 409, message: "Store Alredy Added" })
        }

        if (!req.file) {
            return res.status(401).json({ status: 401, message: "Store Image File Required" })
        }

        checkstore = await store.create({
            multipleQty,
            recieveQty,
            storeuploadFile: req.file.path,
            storedate,
            DriverContactNumber,
            Invoicenumber,
            Invoicedate,
            TransporterName,
            LRNumber,
            DriverName,
            VehicleNumber,
            EwayBillNumber,
            Frieght,
            purchase,
            Remark,
            total,
            status
        });

        return res.status(201).json({ status: 201, message: "Store Created SuccessFully...", store: checkstore })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getAllstore = async (req, res) => {
    try {

        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Can't Be Less Than 1" })
        }

        let paginatedstore;

        paginatedstore = await store.find();

        let count = paginatedstore.length

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize;
            let lastIndex = (startIndex + pageSize)
            paginatedstore = await paginatedstore.slice(startIndex, lastIndex);
        }
        console.log(paginatedstore);

        return res.status(200).json({ status: 200, store: count, message: "All Store Found SuccessFully...", store: paginatedstore })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getstoreById = async (req, res) => {
    try {
        let id = req.params.id

        let checkStoreId = await store.findById(id)

        if (!checkStoreId) {
            return res.status(404).json({ status: 404, message: "Store Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Store Found SuccessFully...", store: checkStoreId });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.updatestoreById = async (req, res) => {
    try {
        let id = req.params.id
        let checkStoreId = await store.findById(id)

        if (!checkStoreId) {
            return res.status(404).json({ status: 404, message: "Store Not Found" })
        }

        if (req.file) {
            req.body.storeuploadFile = req.file.path
        }

        checkStoreId = await store.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Store Updated SuccessFully...", store: checkStoreId })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.deletestoreById = async (req, res) => {
    try {
        let id = req.params.id

        let checkStoreId = await store.findById(id)

        if (!checkStoreId) {
            return res.status(404).json({ status: 404, message: "Store Not Found" });
        }

        await store.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Store Remove SuccessFully..." })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}