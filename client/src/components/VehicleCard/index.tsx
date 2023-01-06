import { Card } from "antd";
import { ReactSVG } from "react-svg";

import TagIcon from "../../assets/icons/tag.svg";
import { ICard } from "../../types/interfaces";

function VehicleCard({ brand, vehicle, year, isActive, isSold }: ICard) {
  return (
    <Card
      className={
        isActive ? "vehicles__card vehicles__card--is-ative" : "vehicles__card"
      }
      hoverable
      bordered
    >
      <div className="vehicles__card__content">
        <div>
          <h4 className="vehicles__card__brand">{brand}</h4>
          <h4 className="vehicles__card__vehicle">{vehicle}</h4>
          <h4 className="vehicles__card__year">{year}</h4>
        </div>
        <ReactSVG
          src={TagIcon}
          beforeInjection={(svg) =>
            svg.classList.add(isSold ? "vehicles__card__tag--is-sold" : "")
          }
        />
      </div>
    </Card>
  );
}

export default VehicleCard;
