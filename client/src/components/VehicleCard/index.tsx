import { Card } from "antd";
import { ReactSVG } from "react-svg";

import TagIcon from "../../assets/icons/tag.svg";
import { ICard } from "../../types/interfaces";

function VehicleCard({
  id,
  brand,
  vehicle,
  year,
  isActive,
  isSold,
  onVehicleSelect,
}: ICard) {
  return (
    <Card
      className={
        isActive ? "vehicles__card vehicles__card--is-ative" : "vehicles__card"
      }
      hoverable
      bordered
      onClick={() =>
        onVehicleSelect((prev) => {
          if (prev === id) {
            return "";
          }
          return id;
        })
      }
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
            svg.classList.add(
              isSold ? "vehicles__card__tag--is-sold" : "vehicles__card",
            )
          }
        />
      </div>
    </Card>
  );
}

export default VehicleCard;
