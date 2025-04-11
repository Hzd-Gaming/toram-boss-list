import React, { Fragment, useCallback, useMemo, useState } from 'react';

import {
  DownOutlined,
  InfoCircleTwoTone,
  RetweetOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Card, Col, Grid, Popover, Row, Space, Tabs, TabsProps } from 'antd';
import cx from 'classnames';
import { capitalize } from 'lodash';
import { useWindowSize } from 'usehooks-ts';

import { CTOverflowText } from '@/components';
import { BranchedStat, StatValue, SubBranchedNumberStat } from '@/database';
import { thousandFormat } from '@/utils/number.utils';

import { ListCardProps } from './ListCard.type';

import './ListCard.style.scss';

const mainStatLabelColSpan = 8;
const mainStatValueColSpan = 16;
const longLabelColSpan = 15;
const longValueColSpan = 9;

const ListCard: React.FC<ListCardProps> = ({
  id,
  data,
  isDarkMode,
  ...props
}) => {
  const [tabKey, setTabKey] = useState<
    'ez' | 'normal' | 'hard' | 'nm' | 'ulti' | string
  >('normal');
  const [showDetailStat, setShowDetailStat] = useState(false);
  const { xs, sm, lg, xl } = Grid.useBreakpoint();
  const { width: windowWidth } = useWindowSize();

  const maxCharBossName = useMemo(() => {
    const noXtraIcon = !data?.linkedMons;
    // handle when there is no xtra icon
    // modify xl above screen
    if (noXtraIcon && xl && windowWidth >= 2500) return 55;
    if (noXtraIcon && xl && windowWidth >= 2000) return 40;
    if (noXtraIcon && xl && windowWidth >= 1600) return 30;
    // modify lg screen
    if (noXtraIcon && lg && windowWidth >= 1400) return 40;
    if (noXtraIcon && lg && windowWidth >= 1150) return 35;
    if (noXtraIcon && lg && windowWidth >= 1050) return 30;
    if (noXtraIcon && lg && windowWidth >= 1000) return 25;
    if (noXtraIcon && lg) return 20;
    // modify sm screen
    if (noXtraIcon && sm && windowWidth >= 900) return 40;
    if (noXtraIcon && sm && windowWidth >= 800) return 35;
    if (noXtraIcon && sm && windowWidth >= 750) return 30;
    if (noXtraIcon && sm && windowWidth >= 700) return 25;
    if (noXtraIcon && sm) return 20;
    // modify xs screen
    if (noXtraIcon && xs && windowWidth >= 550) return 45;
    if (noXtraIcon && xs && windowWidth >= 500) return 40;
    if (noXtraIcon && xs && windowWidth >= 450) return 35;
    if (noXtraIcon && xs && windowWidth >= 400) return 30;
    if (noXtraIcon && xs && windowWidth >= 350) return 25;
    if (noXtraIcon && xs && windowWidth >= 300) return 20;
    if (noXtraIcon && xs && windowWidth >= 250) return 15;
    if (noXtraIcon && xs && windowWidth >= 200) return 10;

    // handle when there is xtra icon
    // modify xl above screen
    if (xl && windowWidth >= 2500) return 50;
    if (xl && windowWidth >= 2000) return 35;
    if (xl && windowWidth >= 1600) return 25;
    // modify lg screen
    if (lg && windowWidth >= 1400) return 35;
    if (lg && windowWidth >= 1150) return 30;
    if (lg && windowWidth >= 1050) return 25;
    if (lg && windowWidth >= 1000) return 20;
    if (lg) return 15;
    // modify sm screen
    if (sm && windowWidth >= 900) return 35;
    if (sm && windowWidth >= 800) return 30;
    if (sm && windowWidth >= 750) return 25;
    if (sm && windowWidth >= 700) return 20;
    // modify xs screen
    if (xs && windowWidth >= 550) return 40;
    if (xs && windowWidth >= 500) return 35;
    if (xs && windowWidth >= 450) return 30;
    if (xs && windowWidth >= 400) return 25;
    if (xs && windowWidth >= 350) return 20;
    if (xs && windowWidth >= 300) return 15;
    if (xs && windowWidth >= 250) return 10;
    if (xs && windowWidth >= 200) return 5;

    // default
    return 15;
  }, [data?.linkedMons, lg, sm, windowWidth, xl, xs]);

  const maxCharStatValue = useMemo(() => {
    // modify xl above screen
    if (xl && windowWidth >= 2500) return 53;
    if (xl && windowWidth >= 2000) return 38;
    if (xl && windowWidth >= 1600) return 26;
    // modify lg screen
    if (lg && windowWidth >= 1400) return 38;
    if (lg && windowWidth >= 2150) return 33;
    if (lg && windowWidth >= 1150) return 24;
    if (lg) return 18;
    // modify sm screen
    if (sm && windowWidth >= 900) return 38;
    if (sm && windowWidth >= 800) return 24;
    if (sm && windowWidth >= 750) return 22;
    if (sm && windowWidth >= 700) return 20;
    // modify xs screen
    if (xs && windowWidth >= 550) return 43;
    if (xs && windowWidth >= 500) return 38;
    if (xs && windowWidth >= 450) return 33;
    if (xs && windowWidth >= 400) return 28;
    if (xs && windowWidth >= 350) return 22;
    if (xs && windowWidth >= 300) return 15;
    if (xs && windowWidth >= 250) return 11;
    if (xs && windowWidth >= 200) return 8;

    // default
    return 16;
  }, [lg, sm, windowWidth, xl, xs]);

  const maxCharStatLabel = useMemo(() => {
    // modify xl above screen
    if (xl && windowWidth >= 2500) return 50;
    if (xl && windowWidth >= 2000) return 35;
    if (xl && windowWidth >= 1600) return 25;
    // modify lg screen
    if (lg && windowWidth >= 1400) return 35;
    if (lg && windowWidth >= 1150) return 30;
    if (lg && windowWidth >= 1050) return 25;
    if (lg && windowWidth >= 1000) return 20;
    if (lg) return 15;
    // modify sm screen
    if (sm && windowWidth >= 900) return 35;
    if (sm && windowWidth >= 800) return 30;
    if (sm && windowWidth >= 750) return 25;
    if (sm && windowWidth >= 700) return 15;
    if (sm) return 8;

    // modify xs screen
    if (xs && windowWidth >= 550) return 40;
    if (xs && windowWidth >= 500) return 35;
    if (xs && windowWidth >= 450) return 30;
    if (xs && windowWidth >= 400) return 25;
    if (xs && windowWidth >= 350) return 12;
    if (xs && windowWidth >= 300) return 8;
    if (xs && windowWidth >= 200) return 3;

    // default
    return 3;
  }, [lg, sm, windowWidth, xl, xs]);

  const renderBranchedStatValue = useCallback(
    (value: StatValue | undefined) => {
      if (typeof value === 'object' && value?.initial) {
        const text =
          typeof value?.initial === 'string'
            ? capitalize((value?.initial || '???') as string)
            : thousandFormat(value?.initial as number);

        return (
          <Space align="center">
            <CTOverflowText
              textClassName="bold"
              text={text as string}
              maxChar={maxCharStatValue}
            />
            <Popover
              classNames={{
                root: cx(
                  'list_card__popover',
                  isDarkMode && 'list_card__popover--dark'
                ),
              }}
              title="This value changes depends on specific situation"
              content={
                <Row gutter={[4, 12]}>
                  {Object?.keys(value)?.map((valKey) => {
                    const isValBranched = typeof value?.[valKey] === 'object';
                    if (!isValBranched) {
                      return (
                        <Fragment key={`popover-${data?.name}-${valKey}`}>
                          <Col xs={longLabelColSpan}>
                            <Row justify="space-between">
                              <Col>
                                <CTOverflowText text={valKey?.toUpperCase()} />
                              </Col>
                              <Col>:</Col>
                            </Row>
                          </Col>
                          <Col xs={longValueColSpan}>
                            <CTOverflowText
                              textClassName="bold"
                              text={
                                typeof value?.[valKey] === 'string'
                                  ? capitalize(
                                      (value?.[valKey] || '???') as string
                                    )
                                  : thousandFormat(value?.[valKey] as number)
                              }
                              maxChar={maxCharStatValue}
                            />
                          </Col>
                        </Fragment>
                      );
                    } else {
                      const subBranchedStat = value?.[
                        valKey
                      ] as SubBranchedNumberStat;
                      return Object?.keys(subBranchedStat)?.map((valKey2) => {
                        return (
                          <Fragment
                            key={`popover-${data?.name}-${valKey}-${valKey2}`}>
                            <Col xs={longLabelColSpan}>
                              <Row justify="space-between">
                                <Col>
                                  {valKey2 !== 'initial'
                                    ? `${valKey?.toUpperCase()}+${valKey2?.toUpperCase()}`
                                    : 'Initial'}
                                </Col>
                                <Col>:</Col>
                              </Row>
                            </Col>
                            <Col xs={longValueColSpan}>
                              <CTOverflowText
                                text={
                                  typeof subBranchedStat?.[valKey2] === 'string'
                                    ? capitalize(
                                        (subBranchedStat?.[valKey2] ||
                                          '???') as string
                                      )
                                    : thousandFormat(subBranchedStat?.[valKey2])
                                }
                                maxChar={maxCharStatValue}
                                textClassName="bold"
                              />
                            </Col>
                          </Fragment>
                        );
                      });
                    }
                  })}
                </Row>
              }
              trigger="click">
              <InfoCircleTwoTone />
            </Popover>
          </Space>
        );
      } else if (typeof value === 'object' && !value?.initial) {
        const branchedStat = value as BranchedStat;
        return (
          <Popover
            classNames={{
              root: cx(
                'list_card__popover',
                isDarkMode && 'list_card__popover--dark'
              ),
            }}
            title="This value changes depends on specific situation"
            trigger="click"
            content={
              <Row gutter={[4, 12]}>
                {Object?.keys(branchedStat)?.map((valKey) => {
                  const isValBranched =
                    typeof branchedStat?.[valKey] === 'object';
                  if (!isValBranched) {
                    return (
                      <Fragment key={`popover-${data?.name}-${valKey}`}>
                        <Col xs={longLabelColSpan}>
                          <Row justify="space-between">
                            <Col>
                              <CTOverflowText text={valKey?.toUpperCase()} />
                            </Col>
                            <Col>:</Col>
                          </Row>
                        </Col>
                        <Col xs={longValueColSpan}>
                          <CTOverflowText
                            textClassName="bold"
                            text={
                              typeof branchedStat[valKey] === 'string'
                                ? capitalize(
                                    (branchedStat[valKey] || '???') as string
                                  )
                                : thousandFormat(branchedStat[valKey] as number)
                            }
                            maxChar={maxCharStatValue}
                          />
                        </Col>
                      </Fragment>
                    );
                  } else {
                    const subBranchedStat = value?.[
                      valKey
                    ] as SubBranchedNumberStat;
                    return Object?.keys(subBranchedStat)?.map((valKey2) => {
                      return (
                        <Fragment
                          key={`popover-${data?.name}-${valKey}-${valKey2}`}>
                          <Col xs={longLabelColSpan}>
                            <Row justify="space-between">
                              <Col>
                                <CTOverflowText
                                  text={`${valKey?.toUpperCase()} => ${valKey2?.toUpperCase()}`}
                                />
                              </Col>
                              <Col>:</Col>
                            </Row>
                          </Col>
                          <Col xs={longValueColSpan}>
                            <CTOverflowText
                              textClassName="bold"
                              text={
                                typeof subBranchedStat?.[valKey2] === 'string'
                                  ? capitalize(
                                      (subBranchedStat?.[valKey2] ||
                                        '???') as string
                                    )
                                  : thousandFormat(
                                      subBranchedStat?.[valKey2] as number
                                    )
                              }
                              maxChar={maxCharStatValue}
                            />
                          </Col>
                        </Fragment>
                      );
                    });
                  }
                })}
              </Row>
            }>
            <InfoCircleTwoTone />
          </Popover>
        );
      } else {
        return (
          <CTOverflowText
            textClassName="bold"
            text={
              typeof value === 'string'
                ? capitalize((value || '???') as string)
                : thousandFormat(value as number)
            }
            maxChar={maxCharStatValue}
          />
        );
      }
    },
    [data?.name, isDarkMode, maxCharStatValue]
  );

  const mainStat = useMemo(() => {
    // handle boss main stat with difficulties
    if (data?.stats) {
      const renderTabChildren = (
        key: 'ez' | 'normal' | 'hard' | 'nm' | 'ulti'
      ) => {
        return (
          <Row gutter={[4, 12]}>
            {/* LV */}
            <Col xs={mainStatLabelColSpan}>
              <Row justify="space-between">
                <Col>
                  <CTOverflowText text="LV" maxChar={maxCharStatLabel} />
                </Col>
                <Col>:</Col>
              </Row>
            </Col>
            <Col xs={mainStatValueColSpan}>
              <CTOverflowText
                textClassName="bold"
                text={thousandFormat(data?.stats?.[key]?.lv as number)}
                maxChar={maxCharStatValue}
              />
            </Col>

            {/* EXP */}
            <Col xs={mainStatLabelColSpan}>
              <Row justify="space-between">
                <Col>
                  <CTOverflowText text="EXP" maxChar={maxCharStatLabel} />
                </Col>
                <Col>:</Col>
              </Row>
            </Col>
            <Col xs={mainStatValueColSpan}>
              <CTOverflowText
                textClassName="bold"
                text={thousandFormat(data?.stats?.[key]?.exp as number)}
                maxChar={maxCharStatValue}
              />
            </Col>

            {/* HP */}
            <Col xs={mainStatLabelColSpan}>
              <Row justify="space-between">
                <Col>
                  <CTOverflowText text="HP" maxChar={maxCharStatLabel} />
                </Col>
                <Col>:</Col>
              </Row>
            </Col>
            <Col xs={mainStatValueColSpan}>
              <CTOverflowText
                textClassName="bold"
                text={thousandFormat(data?.stats?.[key]?.hp as number)}
                maxChar={maxCharStatValue}
              />
            </Col>

            {/* Collapsible Stat */}
            {showDetailStat && (
              <>
                {/* Defense */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="DEF" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.def)}
                </Col>

                {/* Physical Resist */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="%PRES" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.pres)}
                </Col>

                {/* Magic Defense */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="MDEF" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.mdef)}
                </Col>

                {/* Magic Resist */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="%MRES" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.mres)}
                </Col>

                {/* Crit Resist */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="CRES" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.cres)}
                </Col>

                {/* Normal Prorate */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText
                        text="%NPROR"
                        maxChar={maxCharStatLabel}
                      />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.npror)}
                </Col>

                {/* Physical Prorate */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText
                        text="%PPROR"
                        maxChar={maxCharStatLabel}
                      />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.ppror)}
                </Col>

                {/* Magic Prorate */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText
                        text="%MPROR"
                        maxChar={maxCharStatLabel}
                      />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.mpror)}
                </Col>

                {/* FLEE */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText text="FLEE" maxChar={maxCharStatLabel} />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.flee)}
                </Col>

                {/* EVADE */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText
                        text="%EVADE"
                        maxChar={maxCharStatLabel}
                      />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.evade)}
                </Col>

                {/* GUARD */}
                <Col xs={mainStatLabelColSpan}>
                  <Row justify="space-between">
                    <Col>
                      <CTOverflowText
                        text="%GUARD"
                        maxChar={maxCharStatLabel}
                      />
                    </Col>
                    <Col>:</Col>
                  </Row>
                </Col>
                <Col xs={mainStatValueColSpan}>
                  {renderBranchedStatValue(data?.stats?.[key]?.guard)}
                </Col>
              </>
            )}
          </Row>
        );
      };
      const items: TabsProps['items'] = [
        { key: 'ez', label: 'Ez', children: renderTabChildren('ez') },
        {
          key: 'normal',
          label: 'Norm',
          children: renderTabChildren('normal'),
        },
        { key: 'hard', label: 'Hard', children: renderTabChildren('hard') },
        { key: 'nm', label: 'Nm', children: renderTabChildren('nm') },
        { key: 'ulti', label: 'Ulti', children: renderTabChildren('ulti') },
      ];

      return (
        <>
          <Row
            className={cx(
              'list_card__main_status_title_wrapper mb--1',
              isDarkMode && 'list_card__main_status_title_wrapper--dark'
            )}
            justify="center">
            <b>Difficulties Stat</b>
          </Row>
          <Tabs
            defaultActiveKey="normal"
            items={items}
            onChange={(key) => setTabKey(key)}
          />
        </>
      );
    }

    // handle boss main stat without difficulties
    return (
      <>
        <Row
          className={cx(
            'list_card__main_status_title_wrapper',
            isDarkMode && 'list_card__main_status_title_wrapper--dark'
          )}
          justify="center">
          <b>Main Status</b>
        </Row>
        <Row gutter={[4, 12]}>
          {/* LV */}
          <Col xs={mainStatLabelColSpan}>
            <Row justify="space-between">
              <Col>
                <CTOverflowText text="LV" maxChar={maxCharStatLabel} />
              </Col>
              <Col>:</Col>
            </Row>
          </Col>
          <Col xs={mainStatValueColSpan}>
            <CTOverflowText
              textClassName="bold"
              text={thousandFormat(data?.lv as number)}
              maxChar={maxCharStatValue}
            />
          </Col>

          {/* EXP */}
          <Col xs={mainStatLabelColSpan}>
            <Row justify="space-between">
              <Col>
                <CTOverflowText text="EXP" maxChar={maxCharStatLabel} />
              </Col>
              <Col>:</Col>
            </Row>
          </Col>
          <Col xs={mainStatValueColSpan}>
            <CTOverflowText
              textClassName="bold"
              text={thousandFormat(data?.exp as number)}
              maxChar={maxCharStatValue}
            />
          </Col>

          {/* HP */}
          <Col xs={mainStatLabelColSpan}>
            <Row justify="space-between">
              <Col>
                <CTOverflowText text="HP" maxChar={maxCharStatLabel} />
              </Col>
              <Col>:</Col>
            </Row>
          </Col>
          <Col xs={mainStatValueColSpan}>
            {renderBranchedStatValue(data?.hp)}
          </Col>

          {/* Collapsible Stat */}
          {showDetailStat && (
            <>
              {/* Defense */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="DEF" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.def)}
              </Col>

              {/* Physical Resist */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%PRES" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.pres)}
              </Col>

              {/* Magic Defense */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="MDEF" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.mdef)}
              </Col>

              {/* Magic Resist */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%MRES" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.mres)}
              </Col>

              {/* Crit Resist */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="CRES" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.cres)}
              </Col>

              {/* Normal Prorate */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%NPROR" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.npror)}
              </Col>

              {/* Physical Prorate */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%PPROR" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.ppror)}
              </Col>

              {/* Magic Prorate */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%MPROR" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.mpror)}
              </Col>

              {/* FLEE */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="FLEE" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.flee)}
              </Col>

              {/* EVADE */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%EVADE" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.evade)}
              </Col>

              {/* GUARD */}
              <Col xs={mainStatLabelColSpan}>
                <Row justify="space-between">
                  <Col>
                    <CTOverflowText text="%GUARD" maxChar={maxCharStatLabel} />
                  </Col>
                  <Col>:</Col>
                </Row>
              </Col>
              <Col xs={mainStatValueColSpan}>
                {renderBranchedStatValue(data?.guard)}
              </Col>
            </>
          )}
        </Row>
      </>
    );
  }, [
    data,
    isDarkMode,
    showDetailStat,
    maxCharStatLabel,
    maxCharStatValue,
    renderBranchedStatValue,
  ]);

  const handleToggleShowDetail = useCallback(() => {
    if (showDetailStat) {
      const elementTopCoordinate = document
        ?.getElementById(id)
        ?.getBoundingClientRect()?.top;
      const stickyHeaderHeight = 80;
      window.scrollTo({
        behavior: 'smooth',
        top: Number(elementTopCoordinate) + window.scrollY - stickyHeaderHeight,
      });
    }
    setShowDetailStat(!showDetailStat);
  }, [id, showDetailStat]);

  return (
    <Card
      id={id}
      className={cx(
        'list_card',
        isDarkMode && 'list_card--dark',
        Boolean(data?.stats) && `list_card--${tabKey}`
      )}
      title={<CTOverflowText text={data?.name} maxChar={maxCharBossName} />}
      {...(data?.linkedMons ? { extra: <RetweetOutlined /> } : {})}
      actions={[
        <Row onClick={handleToggleShowDetail} justify="center">
          <Space>
            {showDetailStat ? <UpOutlined /> : <DownOutlined />}
            <b>{showDetailStat ? 'See Less' : 'See More'}</b>
          </Space>
        </Row>,
      ]}
      {...props}>
      <Row gutter={[4, 12]}>
        {/* Location */}
        <Col xs={mainStatLabelColSpan}>
          <Row justify="space-between">
            <Col>
              <CTOverflowText text="Location" maxChar={maxCharStatLabel} />
            </Col>
            <Col>:</Col>
          </Row>
        </Col>
        <Col xs={mainStatValueColSpan}>
          <CTOverflowText
            textClassName="bold"
            text={data?.loc || '???'}
            maxChar={maxCharStatValue}
          />
        </Col>

        {/* Element */}
        <Col xs={mainStatLabelColSpan}>
          <Row justify="space-between">
            <Col>
              <CTOverflowText text="Element" maxChar={maxCharStatLabel} />
            </Col>
            <Col>:</Col>
          </Row>
        </Col>
        <Col xs={mainStatValueColSpan}>
          {renderBranchedStatValue(data?.ele)}
        </Col>
      </Row>

      {/* Render Main Stat */}
      {mainStat}
    </Card>
  );
};

export default ListCard;
