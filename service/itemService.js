const Cabinet = require("../models/cabinet");
const Graphics = require("../models/graphics");
const Headset = require("../models/headset");
const Keyboard = require("../models/keyboard");
const Memory = require("../models/memory");
const Monitor = require("../models/monitor");
const Motherboard = require("../models/motherboard");
const Mouse = require("../models/mouse");
const Power = require("../models/power");
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

            case "motherboard":
                const motherboard = new Motherboard(data);
                return motherboard.save();
                break;

            case "monitor":
                const monitor = new Monitor(data);
                return monitor.save();
                break;

            case "power":
                const power = new Power(data);
                return power.save();
                break;

            case "cabinet":
                const cabinet = new Cabinet(data);
                return cabinet.save();
                break;

            case "mouse":
                const mouse = new Mouse(data);
                return mouse.save();
                break;
                
            case "keyboard":
                const keyboard = new Keyboard(data);
                return keyboard.save();
                break;

            case "headset":
                const headset = new Headset(data);
                return headset.save();
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

            case "motherboard":
                res = await Motherboard.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "monitor":
                res = await Monitor.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "power":
                res = await Power.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "cabinet":
                res = await Cabinet.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "mouse":
                res = await Mouse.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "keyboard":
                res = await Keyboard.find({ sku: item }).then((response) => {
                    if (response == "") {
                        return false
                    } else {
                        return true
                    }
                })
                break;

            case "headset":
                res = await Headset.find({ sku: item }).then((response) => {
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

            case "motherboard":
                Motherboard.updateOne(sku, data)
                Motherboard.findOneAndUpdate()
                break;

            case "monitor":
                Monitor.updateOne(sku, data)
                Monitor.findOneAndUpdate()
                break;

            case "power":
                Power.updateOne(sku, data)
                Power.findOneAndUpdate()
                break;

            case "cabinet":
                Cabinet.updateOne(sku, data)
                Cabinet.findOneAndUpdate()
                break;

            case "keyboard":
                Keyboard.updateOne(sku, data)
                Keyboard.findOneAndUpdate()
                break;
            
            case "mouse":
                Mouse.updateOne(sku, data)
                Mouse.findOneAndUpdate()
                break;

            case "headset":
                Headset.updateOne(sku, data)
                Headset.findOneAndUpdate()
                break;

            default:
                break;
        }

    }
}

module.exports = itemService;