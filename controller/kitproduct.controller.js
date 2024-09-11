const kitProduct = require('../models/kitProduct.models');

exports.createKitProduct = async (req, res) => {
    try {
        let { kitName, product, qty } = req.body;
        let chekcKitProduct = await kitProduct.findOne({ kitName: req.body.kitName })

        if (chekcKitProduct) {
            return res.json({ status: 400, message: "kitProduct already exists" })
        }

        chekcKitProduct = await kitProduct.create({
            kitName,
            product,
            qty
        });
        return res.json({ status: 201, message: "kitProduct created successfully", kitProduct: chekcKitProduct })
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllKitProduct = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.json({ status: 400, message: "Page And PageSize Can't Be Less Then 1" })
        }
        let paginatedKitProduct
        paginatedKitProduct = await kitProduct.find();

        let count = paginatedKitProduct.length;

        if (count === 0) {
            return res.json({ status: 404, message: "No kitProduct Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedKitProduct = paginatedKitProduct.slice(startIndex, lastIndex)
        }
        return res.json({ status: 200, TotalKitProducts: count, message: 'All kitProduct Found Successfully..', kitProduct: paginatedKitProduct })
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getkitProductById = async (req, res) => {
    try {
        let id = req.params.id;
        let kitProductById = await kitProduct.findById(id);
        if (!kitProductById) {
            return res.json({ status: 404, message: "kitProduct Not Found" })
        }
        return res.json({ status: 200, message: "kitProduct Found Successfully..", kitProduct: kitProductById })
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.updateKitProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let kitProductById = await kitProduct.findById(id);

        if (!kitProductById) {
            return res.json({ status: 404, message: "kitProduct Not Found" })
        }
        kitProductById = await kitProduct.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.json({ status: 200, message: "kitProduct Updated Successfully..", kitProduct: kitProductById });
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteKitProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let kitProductById = await kitProduct.findById(id);

        if (!kitProductById) {
            return res.json({ status: 404, message: "kitProduct Not Found" })
        }
        await kitProduct.findByIdAndDelete(id);
        return res.json({ status: 200, message: "kitProduct Deleted Successfully.." });
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
}