<template>
    <section class="column-wrapper">
        <template v-if="loading">
        <Preloader />
        </template>
        <nav class="navigation" v-if="!loading">
            <button class="navigation-button"
            :class="{selected: selectedteam == entry.id}"
            v-for="entry in api"
            :key="entry.id"
            :groupid="entry.id"
            :disabled="selectedteam == entry.id ? true : false"
            @click="updateTable(entry.id)">
                {{ entry.name }}
            </button>
        </nav>

        <!-- Leaderboard table -->
        <section class="leaderboard-wrapper"
        v-if="currentteam && !loading"
        :class="{flipping: flipping == true}"
        >
            <table class="leaderboard">
                <!-- Column headers -->
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Game points</th>
                    <th>Match points</th>
                    <th>Played</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lose</th>
                </tr>

                <tr class="leaderboard__row" v-for="(team, index) in currentteam.league_group_teams"
                :key="team.id"
                @click="openURL(team.team.website)">
                    <td class="leaderboard__column" :style="{'--delay': `0.${index}s`}">
                        <span>{{ index + 1 }}</span>
                    </td>
                    <td class="leaderboard__column">
                        {{ team.team.club_name }}
                    </td>
                    <td class="leaderboard__column">
                        {{ team.team_matches_score }}
                    </td>
                    <td class="leaderboard__column">
                        {{ team.team_match_schedules_score }}
                    </td>
                    <td class="leaderboard__column">
                        {{ team.team_matches_played_count }}
                    </td>
                    <td class="leaderboard__column leaderboard__column--win">
                        {{ team.team_matches_win_count }}
                    </td>
                    <td class="leaderboard__column">
                        {{ team.team_matches_draw_count }}
                    </td>
                    <td class="leaderboard__column leaderboard__column--lose">
                        {{ team.team_matches_lose_count }}
                    </td>
                </tr>
            </table>
        </section>
        <!-- <p v-bind="currentteam">{{ currentteam }}</p> -->
    </section>
</template>

<script>
import { onMounted, ref } from "vue"
import { getTeams } from "../util/api"
import Preloader from "./Preloader"
export default {
    name: "Leaderboard",
    components: {
        Preloader
    },
    setup() {
        const api = ref(null) // api response
        const selectedteam = ref(null) // ID of currently selected team, used for classes, etc
        const currentteam = ref(null) // Object of currently selected team
        const loading = ref(null) // For preloader
        const flipping = ref(null) // Whilst flipping animation > do not update table

        const updateTable = (groupID) => {
            flipping.value = true
            selectedteam.value = groupID
            setTimeout(() => {
                currentteam.value = api.value.find((group) => {
                    return group.id == groupID
                })
            }, 375);
            setTimeout(() => {
                flipping.value = false                
            }, 750);
        }

        const openURL = (url) => {
            const newURL = window.open(url, "_blank")
            newURL.location
        }

        onMounted(async() => {
            try {
                loading.value = true
                api.value = await getTeams()
                loading.value = false
                selectedteam.value = api.value[0].id
                // console.log(selectedteam.value)

                currentteam.value = api.value.find((group) => {
                    // console.log(group.id)
                    return group.id == selectedteam.value
                })
                console.log(currentteam.value)
            } catch (error) {
                alert("Something went wrong")
            }
            
        })
        return {
            api,
            selectedteam,
            currentteam,
            updateTable,
            loading,
            flipping,
            openURL
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.leaderboard-wrapper {
    perspective: 1000px;
    perspective-origin: top;
    transform-style: preserve-3d;
    &.flipping {
        animation: .75s flipRight forwards cubic-bezier(0.37, 0, 0.63, 1);
    }
}

@keyframes flipRight {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(90deg);
    }
    100% {
        transform: rotateY(0deg);
    }
}

.column-wrapper {
    margin: 0 auto;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 1000px;
    height: 100%;
    align-items: center;
}
.navigation {
    background-color: #ffffff;
    padding: 4px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 20px;
    transform: translateY(-100%);
    animation: .4s slideInTop forwards;
    &-button {
        cursor: pointer;
        border: none;
        padding: 10px 14px;
        color: var(--fg-secondary-color);
        background-color: unset;
        border-radius: var(--border-radius);
        font-size: 14px;
        font-weight: 600;
        &.selected {
            background-color: var(--fg-color);
            color: var(--bg-color);
            &:hover {
                background-color: hsl(0, 0%, 40%);
                color: #ffffff;
            }
        }
        &:hover {
            background-color: hsl(0, 0%, 94%);
        }
        &:not(:last-of-type) {
            margin-right: 6px;
        }
    }
}
.leaderboard {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: var(--box-shadow);
    padding: 4px 14px;
    border-collapse: collapse;
    width: 800px;
    table-layout: auto;
    th {
        color: var(--fg-secondary-color);
        font-size: 12px;
        font-weight: 500;
    }
    th, &__column {
        padding: 6px 10px;
        text-align: left;
    }
    &__row {
        position: relative;
        cursor: pointer;
        box-shadow: 0 0 0 0 transparent;
        background-color: #ffffff;        
        transition: .2s;
        &:nth-of-type(even) {
            background-color: hsl(0, 0%, 96%);
        }
        &:hover {
            z-index: 10;
            background-color: var(--primary-color-light);
            transform: scale(1.05);
            box-shadow: var(--box-shadow);
        }
    }
    &__column {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        &:first-of-type {
            span {
                font-size: 12px;
                font-weight: 600;
                line-height: 12px;
                width: 24px;
                height: 24px;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                text-align: center;
                display: flex;
                color: #ffffff;
                background-color: var(--primary-color);
                transform: scale(0);
                animation: .4s popin forwards;
                animation-delay: calc(var(--delay) / 2);
            }
        }
        &--win, &--lose {
            font-weight: 600;
        }
        &--win { color: var(--green-color) }
        &--lose { color: var(--red-color) }
        font-size: 12px;
    }
}
@media screen and (max-width: 850px) {
    .leaderboard {
        background-color: unset;
        width: 850px;
        max-width: 90vw;
        margin: 0 auto;
        display: block;
        box-shadow: unset;
        th {
            display: none;
        }
        &__row {
            display: block;
            background-color: #ffffff;
            margin: 20px 0;
            box-shadow: var(--box-shadow);
            border-radius: 4px;
            padding: 12px 14px;
            &:nth-of-type(even) {
                background-color: unset;
            }
            &:hover { background-color: unset }
        }
        &__column {
            border: unset;
            &:nth-of-type(even) {
                background-color: hsl(0, 0%, 96%);
            }
            white-space: normal;
            display: flex;
            justify-content: end;
            text-align: right;
            font-size: 18px;
            font-weight: 800;

            // Default styling for responsive column headers
            &::before {
                opacity: 0.8;
                font-size: 14px;
                margin-right: auto;
                display: inline-flex;
                align-items: center;
                padding-right: 6px;
            }

            &:nth-of-type(1) { // Different styling for rank nr row
                span {
                    text-align: left;
                    margin-right: auto;
                    background-color: unset;
                    font-weight: 900;
                    font-size: 20px;
                    color: unset;
                }
                &::before {
                    content: "#";
                    font-size: 18px;
                    margin-right: unset;
                }
            }
            // Add column headers back
            &:nth-of-type(2)::before { content: "Team";}
            &:nth-of-type(3)::before { content: "Game points";}
            &:nth-of-type(4)::before { content: "Match points";}
            &:nth-of-type(5)::before { content: "Played";}
            &:nth-of-type(6)::before { content: "Win";}
            &:nth-of-type(7)::before { content: "Draw";}
            &:nth-of-type(8)::before { content: "Lose";}
            &:nth-of-type(9)::before { content: "#";}
        }
    }
}

@keyframes slideInTop {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0%);
    }
}

@keyframes popin {
    0% {
        transform: scale(0);
    }
    70% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
</style>
