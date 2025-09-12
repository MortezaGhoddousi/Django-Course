import { toPersianNumber } from "../api";

function Latest(props) {
    


    return (
        <section className="latest">
            <h2>تازه ترین آگهی ها</h2>
            <div>
                {props.mockData.map((el, ind) => {
                    return <Box data={el} key={ind} />;
                })}
            </div>
        </section>
    );
}

export default Latest;

function Box(props) {  
    return (
        <div>
            <img src={props.data.image} alt="company-image" />
            <h1>{props.data.title}</h1>
            <p>{props.data.company}</p>
            <aside>
                <span>{props.data.city}</span>
                <span>{toPersianNumber(props.data.price)}</span>
            </aside>

            <span>{toPersianNumber(props.data.date)}</span>
            <button>ارسال رزومه</button>

            <span>فوری</span>
            <span>
                <i className="bx bx-heart"></i>
            </span>
        </div>
    );
}
