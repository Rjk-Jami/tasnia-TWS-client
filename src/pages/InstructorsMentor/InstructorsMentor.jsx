import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Collapse } from 'react-collapse';

const InstructorsMentor = () => {
    const height = 100;
    const accessibilityIds = {
        checkbox: 'accessible-marker-example1',
        button: 'accessible-marker-example2'
      };
      const [isCheckboxCollapseOpen, setIsCheckboxCollapseOpen] = useState(false);
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  const onChange = useCallback(
    ({target: {checked}}) => setIsCheckboxCollapseOpen(checked),
    [setIsCheckboxCollapseOpen]
  );

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );
    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Instructors</title>
            </Helmet>
            <PageTitle title={"Our Instructors"}></PageTitle>
            <p className='text-center text-2xl font-bold my-3'>Decade of Teaching <span className='text-warning'>Experience</span></p>


            <div className=" container mx-auto p-3 rounded-xl bg-base-100 shadow-xl grid grid-cols-3 grid-flow-col gap-4 items-center " data-theme="pastelZ">
                <div className="">
                    <img className="mask mask-hexagon-2 col-span-1 ms-auto " src="https://i.ibb.co/WkyC4pM/focused-young-indian-man-meditating-lotus-pose-126.jpg" />
                </div>
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold">{"name"}</h2>
                    <div>
           
            <div className="config">
              <button
                aria-controls={accessibilityIds.button}
                aria-expanded={isButtonCollapseOpen}
                onClick={onClick}
                type="button">
                Reveal content
              </button>
            </div>
            <Collapse
              isOpened={isButtonCollapseOpen}>
              <div style={{height}} id={accessibilityIds.button} className="blob" />
            </Collapse>
          </div>
                    <p></p>
                    <div className=" justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>


        </div>


    );
};

export default InstructorsMentor;