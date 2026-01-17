class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString };
        const excluded = ['sort', 'limit', 'page', 'fields'];
        excluded.forEach(k => delete queryObj[k]);
        const advancedQ = {};
        Object.entries(queryObj).forEach(([key, value]) => {
            if (key === 'price') {
                const num = Number(value);
                if (Number.isNaN(num)) {
                    console.log('>>> BAD exact price value:', value);
                    return;
                }
                console.log('>>> exact price cents:', num);
                advancedQ.ticketClasses = { $elemMatch: { price: num } };
            }
            else if (key.startsWith('price[')) {
                const op = key.match(/\[(.+)\]/)?.[1]; // gte, gt, lte, lt
                const num = Number(value);
                if (Number.isNaN(num)) {
                    console.log('>>> BAD range price value:', value);
                    return;
                }
                if (!advancedQ.ticketClasses)
                    advancedQ.ticketClasses = { $elemMatch: {} };
                if (!advancedQ.ticketClasses.$elemMatch.price) {
                    advancedQ.ticketClasses.$elemMatch.price = {};
                }
                advancedQ.ticketClasses.$elemMatch.price[`$${op}`] = num;
            }
            else {
                advancedQ[key] = value;
            }
        });
        this.query = this.query.find(advancedQ);
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        return this;
    }
    limitField() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v -createdAt -updatedAt');
        }
        return this;
    }
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 6;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
export default APIFeatures;
