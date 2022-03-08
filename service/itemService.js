const Graphics = require("../models/graphics");
const Memory = require("../models/memory");
const Processor = require("../models/processor");
const Storage = require("../models/storage")

class itemService {
    static async create(data, type) {
        switch (type) {
            case "storage":
                const storage = new Storage(data);
                return storage.save();
                break;

            case "graphics":
                const graphics = new Graphics(data);
                return graphics.save();
                break;

            case "processor":
                const processor = new Processor(data);
                return processor.save();
                break;

            case "memory":
                const memory = new Memory(data);
                return memory.save();
                break;

            default:
                break;
        }

    }

    static async getOne(item, type) {
        let res = false;
        switch (type) {
            case "storage":
                res = await Storage.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;
            case "graphics":
                res = await Graphics.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "processor":
                res = await Processor.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "memory":
                res = await Memory.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            default:
                break;
        }
        return res

    }

    static async update(sku, data, type) {
        switch (type) {
            case "storage":
                Storage.updateOne(sku, data)
                Storage.findOneAndUpdate()
                break;
            
            case "graphics":
                Graphics.updateOne(sku, data)
                Graphics.findOneAndUpdate()
                break;

            case "processor":
                Processor.updateOne(sku, data)
                Processor.findOneAndUpdate()
                break;

            case "memory":
                Memory.updateOne(sku, data)
                Memory.findOneAndUpdate()
                break;

            default:
                break;
        }

    }
}

module.exports = itemService;